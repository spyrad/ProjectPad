// Domain Entity Types
// These will be replaced by generated Supabase types later

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  status: 'active' | 'paused' | 'completed'
  goals: string | null
  deadline: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Note {
  id: string
  user_id: string
  project_id: string | null
  content: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Person {
  id: string
  user_id: string
  name: string
  role: string | null
  description: string | null
  expertise: string | null
  contact: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ProjectPerson {
  id: string
  project_id: string
  person_id: string
  project_role: string | null
  created_at: string
}

export interface NotePerson {
  id: string
  note_id: string
  person_id: string
  created_at: string
}
