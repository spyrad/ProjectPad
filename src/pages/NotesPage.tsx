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

export default function NotesPage() {
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
      toast.success('Notiz erfolgreich erstellt');
    } catch (error) {
      console.error('Failed to create note:', error);
      toast.error('Fehler beim Erstellen der Notiz');
    }
  };

  const handleUpdate = async (data: NoteFormData): Promise<void> => {
    if (!editingNote) return;

    try {
      await updateMutation.mutateAsync({ id: editingNote.id, ...data });
      setEditingNote(null);
      toast.success('Notiz erfolgreich aktualisiert');
    } catch (error) {
      console.error('Failed to update note:', error);
      toast.error('Fehler beim Aktualisieren der Notiz');
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Möchtest du diese Notiz wirklich löschen?')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Notiz erfolgreich gelöscht');
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error('Fehler beim Löschen der Notiz');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Lade Notizen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>Fehler beim Laden der Notizen</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notizen</h1>
          <p className="text-muted-foreground mt-2">
            Erfasse deine Gedanken und Ideen
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Neue Notiz
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
            <DialogTitle>Neue Notiz erstellen</DialogTitle>
            <DialogDescription>
              Erfasse eine neue Notiz mit optionaler Projektzuordnung
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
            <DialogTitle>Notiz bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeite den Inhalt deiner Notiz
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
