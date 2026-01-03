import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PersonForm } from '@/components/persons/PersonForm';
import { NoteCard } from '@/components/notes/NoteCard';
import { NoteForm } from '@/components/notes/NoteForm';
import { usePerson, useUpdatePerson, useDeletePerson } from '@/hooks/usePersons';
import { usePersonProjects } from '@/hooks/usePersonProjects';
import { usePersonNotes } from '@/hooks/usePersonNotes';
import { useCreateNote, useUpdateNote, useDeleteNote } from '@/hooks/useNotes';
import { groupNotesByDate } from '@/lib/utils';
import { ArrowLeft, Edit, Trash2, User, Briefcase, Lightbulb, Mail, FolderOpen, FileText, Plus } from 'lucide-react';
import type { PersonFormData } from '@/lib/validations';
import type { Note } from '@/types/entities';
import type { NoteFormData } from '@/lib/validations';

type TabValue = 'overview' | 'projects' | 'notes';

export default function PersonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabValue>('overview');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const { data: person, isLoading, error } = usePerson(id!);
  const { data: personProjects = [] } = usePersonProjects(id);
  const { data: personNotes = [] } = usePersonNotes(id);
  const updateMutation = useUpdatePerson();
  const deleteMutation = useDeletePerson();
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();

  const handleUpdate = async (data: PersonFormData): Promise<void> => {
    if (!person) return;

    try {
      await updateMutation.mutateAsync({ id: person.id, ...data });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update person:', error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!person) return;

    if (!confirm('Möchtest du diese Person wirklich löschen? Die Person wird von allen Projekten entfernt.')) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(person.id);
      navigate('/app/persons');
    } catch (error) {
      console.error('Failed to delete person:', error);
    }
  };

  const handleCreateNote = async (data: NoteFormData): Promise<void> => {
    try {
      await createNoteMutation.mutateAsync({
        ...data,
        person_id: id!, // Pre-fill person ID
      });
      setIsCreateNoteOpen(false);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleUpdateNote = async (data: NoteFormData): Promise<void> => {
    if (!editingNote) return;

    try {
      await updateNoteMutation.mutateAsync({
        id: editingNote.id,
        ...data,
      });
      setEditingNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string): Promise<void> => {
    if (!confirm('Möchtest du diese Notiz wirklich löschen?')) {
      return;
    }

    try {
      await deleteNoteMutation.mutateAsync(noteId);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">Lade Person...</p>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-red-500">
          <p>Fehler beim Laden der Person</p>
          <p className="text-sm mt-2">{error?.message || 'Person nicht gefunden'}</p>
          <Button className="mt-4" onClick={() => navigate('/app/persons')}>
            Zurück zu Kontakten
          </Button>
        </div>
      </div>
    );
  }

  const groupedNotes = groupNotesByDate(personNotes);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/app/persons')}
            className="flex items-center gap-2 -ml-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zu Kontakten
          </Button>
          <h1 className="text-3xl font-bold">{person.name}</h1>
          {person.role && (
            <p className="text-muted-foreground flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {person.role}
            </p>
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
            onClick={() => setActiveTab('projects')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'projects'
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Projekte ({personProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-primary text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Notizen ({personNotes.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Person Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {person.description && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Beschreibung:</p>
                  <p className="text-sm mt-1">{person.description}</p>
                </div>
              )}
              {person.expertise && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Expertise:
                  </p>
                  <p className="text-sm mt-1">{person.expertise}</p>
                </div>
              )}
              {person.contact && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Kontakt:
                  </p>
                  <p className="text-sm mt-1">{person.contact}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiken</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Projekte:
                </span>
                <span className="font-semibold">{personProjects.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notizen:
                </span>
                <span className="font-semibold">{personNotes.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Projekte</h2>
          </div>

          {personProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Keine Projekte</h3>
              <p className="text-muted-foreground">
                Diese Person ist noch keinem Projekt zugeordnet
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {personProjects.map((pp) => (
                <Card key={pp.id} className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/app/projects/${pp.project.id}`)}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">{pp.project.name}</h3>
                    {pp.project_role && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Rolle: {pp.project_role}
                      </p>
                    )}
                    {pp.project.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {pp.project.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Notizen</h2>
              <p className="text-muted-foreground mt-1">
                Alle Notizen zu dieser Person
              </p>
            </div>
            <Button onClick={() => setIsCreateNoteOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Neue Notiz
            </Button>
          </div>

          {groupedNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Keine Notizen</h3>
              <p className="text-muted-foreground mb-4">
                Erstelle die erste Notiz für diese Person
              </p>
              <Button onClick={() => setIsCreateNoteOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Erste Notiz erstellen
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedNotes.map((group) => (
                <div key={group.label} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      {group.label}
                    </h3>
                    <div className="flex-1 border-t border-border" />
                  </div>
                  <div className="space-y-3">
                    {group.notes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={setEditingNote}
                        onDelete={handleDeleteNote}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Person bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeite die Informationen dieser Person
            </DialogDescription>
          </DialogHeader>
          <PersonForm
            person={person}
            onSubmit={handleUpdate}
            isSubmitting={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Create Note Dialog */}
      <Dialog open={isCreateNoteOpen} onOpenChange={setIsCreateNoteOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Neue Notiz erstellen</DialogTitle>
            <DialogDescription>
              Erstelle eine neue Notiz für {person.name}
            </DialogDescription>
          </DialogHeader>
          <NoteForm
            onSubmit={handleCreateNote}
            isSubmitting={createNoteMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Note Dialog */}
      <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Notiz bearbeiten</DialogTitle>
            <DialogDescription>
              Bearbeite die Notizinformationen
            </DialogDescription>
          </DialogHeader>
          {editingNote && (
            <NoteForm
              note={editingNote}
              onSubmit={handleUpdateNote}
              isSubmitting={updateNoteMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
