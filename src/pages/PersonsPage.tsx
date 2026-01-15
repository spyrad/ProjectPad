import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PersonList } from '@/components/persons/PersonList';
import { PersonForm } from '@/components/persons/PersonForm';
import { usePersons, useCreatePerson, useUpdatePerson, useDeletePerson } from '@/hooks/usePersons';
import { Plus } from 'lucide-react';
import type { Person } from '@/types/entities';
import type { PersonFormData } from '@/lib/validations';
import { useTranslation } from 'react-i18next';

export default function PersonsPage() {
  const { t } = useTranslation();
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
      toast.success(t('persons.toast.created'));
    } catch (error) {
      console.error('Failed to create person:', error);
      toast.error(t('persons.toast.createError'));
    }
  };

  const handleUpdate = async (data: PersonFormData): Promise<void> => {
    if (!editingPerson) return;

    try {
      await updateMutation.mutateAsync({ id: editingPerson.id, ...data });
      setEditingPerson(null);
      toast.success(t('persons.toast.updated'));
    } catch (error) {
      console.error('Failed to update person:', error);
      toast.error(t('persons.toast.updateError'));
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm(t('confirmation.deletePerson'))) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      toast.success(t('persons.toast.deleted'));
    } catch (error) {
      console.error('Failed to delete person:', error);
      toast.error(t('persons.toast.deleteError'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">{t('persons.page.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>{t('persons.page.error')}</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('persons.page.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('persons.page.subtitle')}
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t('persons.page.createButton')}
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
            <DialogTitle>{t('persons.form.createTitle')}</DialogTitle>
            <DialogDescription>
              {t('persons.form.createDescription')}
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
            <DialogTitle>{t('persons.form.editTitle')}</DialogTitle>
            <DialogDescription>
              {t('persons.form.editDescription')}
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
