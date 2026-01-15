import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NoteCard } from '@/components/notes/NoteCard';
import { NoteForm } from '@/components/notes/NoteForm';
import { groupNotesByDate } from '@/lib/utils';
import { useProjectNotes, useCreateNote, useUpdateNote, useDeleteNote } from '@/hooks/useNotes';
import { Plus, FileText } from 'lucide-react';
import type { Note } from '@/types/entities';
import type { NoteFormData } from '@/lib/validations';
import { useTranslation } from 'react-i18next';

interface ProjectTimelineProps {
  projectId: string;
}

export function ProjectTimeline({ projectId }: ProjectTimelineProps) {
  const { t } = useTranslation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const { data: notes, isLoading, error } = useProjectNotes(projectId);
  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote();
  const deleteMutation = useDeleteNote();

  const handleCreate = async (data: NoteFormData): Promise<void> => {
    try {
      await createMutation.mutateAsync({
        ...data,
        project_id: projectId, // Pre-fill project ID
      });
      setIsCreateDialogOpen(false);
      toast.success(t('notes.toast.created'));
    } catch (error) {
      console.error('Failed to create note:', error);
      toast.error(t('notes.toast.createError'));
    }
  };

  const handleUpdate = async (data: NoteFormData): Promise<void> => {
    if (!editingNote) return;

    try {
      await updateMutation.mutateAsync({
        id: editingNote.id,
        ...data,
      });
      setEditingNote(null);
      toast.success(t('notes.toast.updated'));
    } catch (error) {
      console.error('Failed to update note:', error);
      toast.error(t('notes.toast.updateError'));
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm(t('confirmation.deleteNote'))) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success(t('notes.toast.deleted'));
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error(t('notes.toast.deleteError'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">{t('projects.timeline.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>{t('projects.timeline.error')}</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  const groupedNotes = notes ? groupNotesByDate(notes) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('projects.timeline.title')}</h2>
          <p className="text-muted-foreground mt-1">
            {t('projects.timeline.description')}
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t('notes.page.createButton')}
        </Button>
      </div>

      {/* Timeline with date groups */}
      {groupedNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-slate-100 p-6 mb-4">
            <FileText className="h-12 w-12 text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{t('projects.timeline.emptyTitle')}</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {t('projects.timeline.emptyDescription')}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t('projects.timeline.firstNoteButton')}
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedNotes.map((group) => (
            <div key={group.label} className="space-y-4">
              {/* Date separator */}
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {group.label}
                </h3>
                <div className="flex-1 border-t border-border" />
              </div>

              {/* Notes in this date group */}
              <div className="space-y-3">
                {group.notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={setEditingNote}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('projects.timeline.createDialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('projects.timeline.createDialogDescription')}
            </DialogDescription>
          </DialogHeader>
          <NoteForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
            defaultProjectId={projectId}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('projects.timeline.editDialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('projects.timeline.editDialogDescription')}
            </DialogDescription>
          </DialogHeader>
          {editingNote && (
            <NoteForm
              note={editingNote}
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
