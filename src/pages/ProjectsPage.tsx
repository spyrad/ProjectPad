import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectList } from '@/components/projects/ProjectList';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks/useProjects';
import { Plus } from 'lucide-react';
import type { Project } from '@/types/entities';
import type { ProjectFormData } from '@/lib/validations';

export default function ProjectsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { data: projects, isLoading, error } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const handleCreate = async (data: ProjectFormData): Promise<void> => {
    try {
      await createMutation.mutateAsync(data);
      setIsCreateDialogOpen(false);
      toast.success('Projekt erfolgreich erstellt');
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Fehler beim Erstellen des Projekts');
    }
  };

  const handleUpdate = async (data: ProjectFormData): Promise<void> => {
    if (!editingProject) return;

    try {
      await updateMutation.mutateAsync({ id: editingProject.id, ...data });
      setEditingProject(null);
      toast.success('Projekt erfolgreich aktualisiert');
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.error('Fehler beim Aktualisieren des Projekts');
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Möchtest du dieses Projekt wirklich löschen? Alle zugehörigen Notizen werden ebenfalls gelöscht.')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Projekt erfolgreich gelöscht');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Fehler beim Löschen des Projekts');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Lade Projekte...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>Fehler beim Laden der Projekte</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projekte</h1>
          <p className="text-muted-foreground mt-2">
            Verwalte deine Projekte und behalte den Überblick
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Neues Projekt
        </Button>
      </div>

      <ProjectList
        projects={projects || []}
        onEdit={setEditingProject}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neues Projekt erstellen</DialogTitle>
            <DialogDescription>
              Erstelle ein neues Projekt für deine Notizen und Aufgaben
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Projekt bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeite die Projektinformationen
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              project={editingProject}
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
