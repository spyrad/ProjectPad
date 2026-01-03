-- =============================================================================
-- ProjectPad Database Schema
-- Supabase PostgreSQL
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ENUMS
-- -----------------------------------------------------------------------------

CREATE TYPE project_status AS ENUM ('active', 'paused', 'completed');

-- -----------------------------------------------------------------------------
-- TABLES
-- -----------------------------------------------------------------------------

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status project_status NOT NULL DEFAULT 'active',
    goals TEXT,
    deadline DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Persons (Contacts)
CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    description TEXT,
    expertise TEXT,
    contact TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Project-Person Junction (N:M)
CREATE TABLE project_persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    project_role VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(project_id, person_id)
);

-- Notes
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    person_id UUID REFERENCES persons(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    content_search TSVECTOR GENERATED ALWAYS AS (to_tsvector('german', content)) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- -----------------------------------------------------------------------------
-- INDEXES
-- -----------------------------------------------------------------------------

-- Projects
CREATE INDEX idx_projects_user_id ON projects(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;

-- Persons
CREATE INDEX idx_persons_user_id ON persons(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_persons_name ON persons(name) WHERE deleted_at IS NULL;

-- Project-Persons
CREATE INDEX idx_project_persons_project_id ON project_persons(project_id);
CREATE INDEX idx_project_persons_person_id ON project_persons(person_id);

-- Notes
CREATE INDEX idx_notes_user_id ON notes(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_notes_project_timeline ON notes(project_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_notes_person_id ON notes(person_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_notes_content_search ON notes USING GIN(content_search) WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- TRIGGERS: Auto-update updated_at
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_persons_updated_at
    BEFORE UPDATE ON persons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_notes_updated_at
    BEFORE UPDATE ON notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- TRIGGERS: Cascade Soft Delete (Project → Notes)
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION cascade_project_soft_delete()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN
        UPDATE notes
        SET deleted_at = NEW.deleted_at
        WHERE project_id = NEW.id AND deleted_at IS NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_project_cascade_soft_delete
    AFTER UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION cascade_project_soft_delete();

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- -----------------------------------------------------------------------------

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Projects Policies
CREATE POLICY "Users can view own projects"
    ON projects FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
    ON projects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
    ON projects FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
    ON projects FOR DELETE
    USING (auth.uid() = user_id);

-- Persons Policies
CREATE POLICY "Users can view own persons"
    ON persons FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own persons"
    ON persons FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own persons"
    ON persons FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own persons"
    ON persons FOR DELETE
    USING (auth.uid() = user_id);

-- Project-Persons Policies (via project ownership)
CREATE POLICY "Users can view own project_persons"
    ON project_persons FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_persons.project_id
            AND projects.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create own project_persons"
    ON project_persons FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_persons.project_id
            AND projects.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own project_persons"
    ON project_persons FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_persons.project_id
            AND projects.user_id = auth.uid()
        )
    );

-- Notes Policies
CREATE POLICY "Users can view own notes"
    ON notes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notes"
    ON notes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
    ON notes FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
    ON notes FOR DELETE
    USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- HELPER FUNCTIONS
-- -----------------------------------------------------------------------------

-- Soft delete a project (with cascade to notes)
CREATE OR REPLACE FUNCTION soft_delete_project(project_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE projects
    SET deleted_at = NOW()
    WHERE id = project_uuid AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Soft delete a person (removes from project associations)
CREATE OR REPLACE FUNCTION soft_delete_person(person_uuid UUID)
RETURNS VOID AS $$
BEGIN
    -- Remove from project associations
    DELETE FROM project_persons WHERE person_id = person_uuid;

    -- Clear person reference from notes (but keep notes)
    UPDATE notes SET person_id = NULL WHERE person_id = person_uuid;

    -- Soft delete the person
    UPDATE persons SET deleted_at = NOW() WHERE id = person_uuid AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Soft delete a note
CREATE OR REPLACE FUNCTION soft_delete_note(note_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE notes SET deleted_at = NOW() WHERE id = note_uuid AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Full-text search on notes
CREATE OR REPLACE FUNCTION search_notes(search_query TEXT)
RETURNS SETOF notes AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM notes
    WHERE content_search @@ plainto_tsquery('german', search_query)
    AND deleted_at IS NULL
    AND user_id = auth.uid()
    ORDER BY ts_rank(content_search, plainto_tsquery('german', search_query)) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
