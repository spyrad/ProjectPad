import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NoteList } from '@/components/notes/NoteList';
import { NoteForm } from '@/components/notes/NoteForm';
import { useNotes, useCreateNote, useUpdateNote, useDeleteNote } from '@/hooks/useNotes';
import { Plus } from 'lucide-react';
import type { Note } from '@/types/entities';
import type { NoteFormData } from '@/lib/validations';
import { useTranslation } from 'react-i18next';

export default function NotesPage() {
  const { t } = useTranslation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const { data: notes, isLoading, error } = useNotes();
  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote();
  const deleteMutation = useDeleteNote();

  const handleCreate = async (data: NoteFormData): Promise<void> => {
    try {
      await createMutation.mutateAsync(data);
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
      await updateMutation.mutateAsync({ id: editingNote.id, ...data });
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
          <p className="mt-4 text-sm text-muted-foreground">{t('notes.page.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>{t('notes.page.error')}</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('notes.page.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('notes.page.subtitle')}
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t('notes.page.createButton')}
        </Button>
      </div>

      <NoteList
        notes={notes || []}
        onEdit={setEditingNote}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('notes.form.createTitle')}</DialogTitle>
            <DialogDescription>
              {t('notes.form.createDescription')}
            </DialogDescription>
          </DialogHeader>
          <NoteForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('notes.form.editTitle')}</DialogTitle>
            <DialogDescription>
              {t('notes.form.editDescription')}
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
