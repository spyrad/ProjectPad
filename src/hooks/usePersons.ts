import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { Person } from '@/types/entities';
import type { PersonFormData } from '@/lib/validations';

// Fetch all persons
export function usePersons() {
  return useQuery({
    queryKey: ['persons'],
    queryFn: async (): Promise<Person[]> => {
      const { data, error } = await supabase
        .from('persons')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// Fetch single person by ID
export function usePerson(id: string) {
  return useQuery({
    queryKey: ['persons', id],
    queryFn: async (): Promise<Person> => {
      const { data, error } = await supabase
        .from('persons')
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

// Create person
export function useCreatePerson() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (person: PersonFormData): Promise<Person> => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('persons')
        .insert({
          user_id: user.id,
          name: person.name,
          role: person.role || null,
          description: person.description || null,
          expertise: person.expertise || null,
          contact: person.contact || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
    },
  });
}

// Update person
export function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...person
    }: PersonFormData & { id: string }): Promise<Person> => {
      const { data, error } = await supabase
        .from('persons')
        .update({
          name: person.name,
          role: person.role || null,
          description: person.description || null,
          expertise: person.expertise || null,
          contact: person.contact || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
      queryClient.invalidateQueries({ queryKey: ['persons', data.id] });
    },
  });
}

// Delete person (soft delete via RPC)
export function useDeletePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase.rpc('soft_delete_person', {
        person_uuid: id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] });
    },
  });
}
