import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ProjectPerson, Person } from '@/types/entities';

// Fetch all persons assigned to a project
export function useProjectPersons(projectId: string | null | undefined) {
  return useQuery({
    queryKey: ['project_persons', projectId],
    queryFn: async (): Promise<(ProjectPerson & { person: Person })[]> => {
      if (!projectId) {
        throw new Error('Project ID is required');
      }

      const { data, error } = await supabase
        .from('project_persons')
        .select(`
          *,
          person:persons(*)
        `)
        .eq('project_id', projectId);

      if (error) throw error;
      return data as (ProjectPerson & { person: Person })[];
    },
    enabled: !!projectId,
  });
}

// Add person to project
export function useAddPersonToProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      project_id,
      person_id,
      project_role,
    }: {
      project_id: string;
      person_id: string;
      project_role?: string;
    }): Promise<ProjectPerson> => {
      const { data, error } = await supabase
        .from('project_persons')
        .insert({
          project_id,
          person_id,
          project_role: project_role || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project_persons', variables.project_id] });
      queryClient.invalidateQueries({ queryKey: ['projects', variables.project_id] });
    },
  });
}

// Remove person from project
export function useRemovePersonFromProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      project_id,
      person_id,
    }: {
      project_id: string;
      person_id: string;
    }): Promise<void> => {
      const { error } = await supabase
        .from('project_persons')
        .delete()
        .eq('project_id', project_id)
        .eq('person_id', person_id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project_persons', variables.project_id] });
      queryClient.invalidateQueries({ queryKey: ['projects', variables.project_id] });
    },
  });
}

// Update person's role in project
export function useUpdatePersonRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      project_id,
      person_id,
      project_role,
    }: {
      project_id: string;
      person_id: string;
      project_role: string;
    }): Promise<ProjectPerson> => {
      const { data, error } = await supabase
        .from('project_persons')
        .update({ project_role })
        .eq('project_id', project_id)
        .eq('person_id', person_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project_persons', variables.project_id] });
    },
  });
}
