import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PersonList } from '@/components/persons/PersonList';
import { PersonForm } from '@/components/persons/PersonForm';
import { usePersons, useCreatePerson, useUpdatePerson, useDeletePerson } from '@/hooks/usePersons';
import { Plus } from 'lucide-react';
import type { Person } from '@/types/entities';
import type { PersonFormData } from '@/lib/validations';

export default function PersonsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const { data: persons, isLoading, error } = usePersons();
  const createMutation = useCreatePerson();
  const updateMutation = useUpdatePerson();
  const deleteMutation = useDeletePerson();

  const handleCreate = async (data: PersonFormData): Promise<void> => {
    try {
      await createMutation.mutateAsync(data);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create person:', error);
    }
  };

  const handleUpdate = async (data: PersonFormData): Promise<void> => {
    if (!editingPerson) return;

    try {
      await updateMutation.mutateAsync({ id: editingPerson.id, ...data });
      setEditingPerson(null);
    } catch (error) {
      console.error('Failed to update person:', error);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('Möchtest du diesen Kontakt wirklich löschen? Die Person wird von allen Projekten und Notizen entfernt.')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete person:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Lade Kontakte...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>Fehler beim Laden der Kontakte</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kontakte</h1>
          <p className="text-muted-foreground mt-2">
            Verwalte deine Kontakte und Projektbeteiligten
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Neuer Kontakt
        </Button>
      </div>

      <PersonList
        persons={persons || []}
        onEdit={setEditingPerson}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neuen Kontakt erstellen</DialogTitle>
            <DialogDescription>
              Erstelle einen neuen Kontakt für deine Projekte
            </DialogDescription>
          </DialogHeader>
          <PersonForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingPerson} onOpenChange={() => setEditingPerson(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kontakt bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeite die Kontaktinformationen
            </DialogDescription>
          </DialogHeader>
          {editingPerson && (
            <PersonForm
              person={editingPerson}
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
