import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { Note } from '@/types/entities';
import type { NoteFormData } from '@/lib/validations';

// Fetch all notes
export function useNotes() {
  return useQuery({
    queryKey: ['notes'],
    queryFn: async (): Promise<Note[]> => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// Fetch notes by project ID
export function useProjectNotes(projectId: string | null | undefined) {
  return useQuery({
    queryKey: ['notes', 'project', projectId],
    queryFn: async (): Promise<Note[]> => {
      if (!projectId) {
        throw new Error('Project ID is required');
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('project_id', projectId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
}

// Fetch single note by ID
export function useNote(id: string) {
  return useQuery({
    queryKey: ['notes', id],
    queryFn: async (): Promise<Note> => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .is('deleted_at', null)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Create note
export function useCreateNote() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (note: NoteFormData): Promise<Note> => {
      if (!user) throw new Error('User not authenticated');

      // Create the note without person_id
      const { data, error } = await supabase
        .from('notes')
        .insert({
          user_id: user.id,
          content: note.content,
          project_id: note.project_id || null,
        })
        .select()
        .single();

      if (error) throw error;

      // If person_id is provided, create note_persons entry
      if (note.person_id && data.id) {
        const { error: notePersonError } = await supabase
          .from('note_persons')
          .insert({
            note_id: data.id,
            person_id: note.person_id,
          });

        if (notePersonError) throw notePersonError;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      if (data.project_id) {
        queryClient.invalidateQueries({ queryKey: ['notes', 'project', data.project_id] });
      }
    },
  });
}

// Update note
export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...note
    }: NoteFormData & { id: string }): Promise<Note> => {
      // Update the note content and project
      const { data, error } = await supabase
        .from('notes')
        .update({
          content: note.content,
          project_id: note.project_id || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Handle person association changes
      if (note.person_id) {
        // Check if note_persons entry already exists
        const { data: existingLink } = await supabase
          .from('note_persons')
          .select('id')
          .eq('note_id', id)
          .eq('person_id', note.person_id)
          .single();

        // Only insert if it doesn't exist
        if (!existingLink) {
          const { error: notePersonError } = await supabase
            .from('note_persons')
            .insert({
              note_id: id,
              person_id: note.person_id,
            });

          if (notePersonError) throw notePersonError;
        }
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', data.id] });
      if (data.project_id) {
        queryClient.invalidateQueries({ queryKey: ['notes', 'project', data.project_id] });
      }
    },
  });
}

// Delete note (soft delete via RPC)
export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.rpc('soft_delete_note', {
        note_uuid: id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
