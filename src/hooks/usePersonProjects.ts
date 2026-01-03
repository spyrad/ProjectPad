import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ProjectPerson, Project } from '@/types/entities';

// Fetch all projects a person is assigned to
export function usePersonProjects(personId: string | null | undefined) {
  return useQuery({
    queryKey: ['person_projects', personId],
    queryFn: async (): Promise<(ProjectPerson & { project: Project })[]> => {
      if (!personId) {
        throw new Error('Person ID is required');
      }

      const { data, error } = await supabase
        .from('project_persons')
        .select(`
          *,
          project:projects(*)
        `)
        .eq('person_id', personId);

      if (error) throw error;

      // Filter out projects that are deleted
      return (data as (ProjectPerson & { project: Project })[]).filter(
        (pp) => pp.project && !pp.project.deleted_at
      );
    },
    enabled: !!personId,
  });
}
