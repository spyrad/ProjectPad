import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useProjectPersons, useAddPersonToProject, useRemovePersonFromProject } from '@/hooks/useProjectPersons';
import { usePersons } from '@/hooks/usePersons';
import { Plus, X, User } from 'lucide-react';

interface ProjectPersonsProps {
  projectId: string;
}

export function ProjectPersons({ projectId }: ProjectPersonsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [projectRole, setProjectRole] = useState('');

  const { data: projectPersons, isLoading, error } = useProjectPersons(projectId);
  const { data: allPersons = [] } = usePersons();
  const addMutation = useAddPersonToProject();
  const removeMutation = useRemovePersonFromProject();

  // Filter out persons already assigned to this project
  const availablePersons = allPersons.filter(
    (person) => !projectPersons?.some((pp) => pp.person_id === person.id)
  );

  const handleAdd = async () => {
    if (!selectedPersonId) return;

    try {
      await addMutation.mutateAsync({
        project_id: projectId,
        person_id: selectedPersonId,
        project_role: projectRole || undefined,
      });
      setIsAddDialogOpen(false);
      setSelectedPersonId('');
      setProjectRole('');
    } catch (error) {
      console.error('Failed to add person to project:', error);
    }
  };

  const handleRemove = async (personId: string) => {
    if (!confirm('Möchtest du diese Person wirklich vom Projekt entfernen?')) {
      return;
    }

    try {
      await removeMutation.mutateAsync({
        project_id: projectId,
        person_id: personId,
      });
    } catch (error) {
      console.error('Failed to remove person from project:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Lade Beteiligte...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>Fehler beim Laden der Beteiligten</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Beteiligte</h2>
          <p className="text-muted-foreground mt-1">
            Personen, die an diesem Projekt beteiligt sind
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
          disabled={availablePersons.length === 0}
        >
          <Plus className="h-4 w-4" />
          Person hinzufügen
        </Button>
      </div>

      {/* List of assigned persons */}
      {!projectPersons || projectPersons.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <User className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Keine Beteiligten</h3>
          <p className="text-muted-foreground mb-4">
            Füge Personen hinzu, um sie diesem Projekt zuzuordnen
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2"
            disabled={availablePersons.length === 0}
          >
            <Plus className="h-4 w-4" />
            Erste Person hinzufügen
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projectPersons.map((pp) => (
            <Card key={pp.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{pp.person.name}</h3>
                    {pp.project_role && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {pp.project_role}
                      </p>
                    )}
                    {pp.person.role && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {pp.person.role}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(pp.person_id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Person Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Person zum Projekt hinzufügen</DialogTitle>
            <DialogDescription>
              Wähle eine Person aus und definiere optional ihre Rolle im Projekt
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="person">Person *</Label>
              <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
                <SelectTrigger>
                  <SelectValue placeholder="Person auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {availablePersons.length === 0 ? (
                    <SelectItem value="none" disabled>
                      Keine Personen verfügbar
                    </SelectItem>
                  ) : (
                    availablePersons.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name} {person.role && `(${person.role})`}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_role">Rolle im Projekt (optional)</Label>
              <Input
                id="project_role"
                placeholder="z.B. Lead Developer, Designer, ..."
                value={projectRole}
                onChange={(e) => setProjectRole(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleAdd} disabled={!selectedPersonId || addMutation.isPending}>
                {addMutation.isPending ? 'Wird hinzugefügt...' : 'Hinzufügen'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
