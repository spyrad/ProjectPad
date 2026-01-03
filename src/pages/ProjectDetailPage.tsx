import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { ProjectTimeline } from '@/components/projects/ProjectTimeline';
import { ProjectPersons } from '@/components/projects/ProjectPersons';
import { useProject, useUpdateProject, useDeleteProject } from '@/hooks/useProjects';
import { ArrowLeft, Edit, Trash2, Calendar, Target } from 'lucide-react';
import type { ProjectFormData } from '@/lib/validations';

type TabValue = 'overview' | 'timeline' | 'persons';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabValue>('timeline');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: project, isLoading, error } = useProject(id!);
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const handleUpdate = async (data: ProjectFormData): Promise<void> => {
    if (!project) return;

    try {
      await updateMutation.mutateAsync({ id: project.id, ...data });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!project) return;

    if (!confirm('Möchtest du dieses Projekt wirklich löschen? Alle zugehörigen Notizen werden ebenfalls gelöscht.')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(project.id);
      navigate('/app/projects');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Lade Projekt...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>Fehler beim Laden des Projekts</p>
          <p className="text-sm mt-2">{error?.message || 'Projekt nicht gefunden'}</p>
          <Button className="mt-4" onClick={() => navigate('/app/projects')}>
            Zurück zu Projekten
          </Button>
        </div>
      </div>
    );
  }

  const statusLabels: Record<string, string> = {
    active: 'Aktiv',
    paused: 'Pausiert',
    completed: 'Abgeschlossen',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    completed: 'bg-blue-500',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/app/projects')}
            className="flex items-center gap-2 -ml-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zu Projekten
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <Badge className={statusColors[project.status]}>
              {statusLabels[project.status]}
            </Badge>
          </div>
          {project.description && (
            <p className="text-muted-foreground">{project.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Bearbeiten
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Löschen
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Übersicht
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'timeline'
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab('persons')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'persons'
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Beteiligte
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Projektziele
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.goals ? (
                <p className="text-sm whitespace-pre-wrap">{project.goals}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Keine Ziele definiert</p>
              )}
            </CardContent>
          </Card>

          {/* Deadline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Deadline
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.deadline ? (
                <p className="text-sm">
                  {new Date(project.deadline).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Keine Deadline gesetzt</p>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Projekt-Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Erstellt am:</span>
                <span>
                  {new Date(project.created_at).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Zuletzt aktualisiert:</span>
                <span>
                  {new Date(project.updated_at).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'timeline' && <ProjectTimeline projectId={project.id} />}

      {activeTab === 'persons' && <ProjectPersons projectId={project.id} />}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Projekt bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeite die Projektinformationen
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            project={project}
            onSubmit={handleUpdate}
            isSubmitting={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
