-- Migration: Add note_persons Junction Table
-- This migration converts the notes-persons relationship from 1:1 to N:M
-- Run this migration in Supabase SQL Editor

-- Step 1: Create note_persons junction table
CREATE TABLE note_persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(note_id, person_id)
);

-- Step 2: Create indexes for efficient lookups
CREATE INDEX idx_note_persons_note_id ON note_persons(note_id);
CREATE INDEX idx_note_persons_person_id ON note_persons(person_id);

-- Step 3: Migrate existing data (if any notes have person_id set)
-- This preserves existing 1:1 relationships by converting them to N:M
INSERT INTO note_persons (note_id, person_id)
SELECT id, person_id
FROM notes
WHERE person_id IS NOT NULL
  AND deleted_at IS NULL;

-- Step 4: Remove person_id column from notes table (now redundant)
ALTER TABLE notes DROP COLUMN person_id;

-- Step 5: Drop old index (no longer needed)
DROP INDEX IF EXISTS idx_notes_person_id;

-- Step 6: Add RLS policies for note_persons
ALTER TABLE note_persons ENABLE ROW LEVEL SECURITY;

-- Users can view note_persons if they own the note
CREATE POLICY "Users can view own note_persons"
    ON note_persons FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM notes
            WHERE notes.id = note_persons.note_id
            AND notes.user_id = auth.uid()
        )
    );

-- Users can create note_persons if they own the note
CREATE POLICY "Users can create own note_persons"
    ON note_persons FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM notes
            WHERE notes.id = note_persons.note_id
            AND notes.user_id = auth.uid()
        )
    );

-- Users can delete note_persons if they own the note
CREATE POLICY "Users can delete own note_persons"
    ON note_persons FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM notes
            WHERE notes.id = note_persons.note_id
            AND notes.user_id = auth.uid()
        )
    );

-- Migration complete!
-- Next steps:
-- 1. Update TypeScript entities (remove person_id from Note interface)
-- 2. Update application hooks to use joins
-- 3. Regenerate database types: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
