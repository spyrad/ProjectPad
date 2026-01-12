import { ProjectCard } from './ProjectCard';
import { FolderKanban } from 'lucide-react';
import type { Project } from '@/types/entities';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-primary/10 p-6 mb-4">
          <FolderKanban className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Noch keine Projekte</h3>
        <p className="text-muted-foreground max-w-md">
          Starte dein erstes Projekt und halte alle wichtigen Informationen an einem Ort fest.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
