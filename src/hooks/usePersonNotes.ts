import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Note } from '@/types/entities';

// Fetch all notes assigned to a person (across all projects)
export function usePersonNotes(personId: string | null | undefined) {
  return useQuery({
    queryKey: ['person_notes', personId],
    queryFn: async (): Promise<Note[]> => {
      if (!personId) {
        throw new Error('Person ID is required');
      }

      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          note_persons!inner(person_id)
        `)
        .eq('note_persons.person_id', personId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!personId,
  });
}
