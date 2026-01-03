import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { noteSchema, type NoteFormData } from '@/lib/validations';
import { useProjects } from '@/hooks/useProjects';
import { usePersons } from '@/hooks/usePersons';
import type { Note } from '@/types/entities';

interface NoteFormProps {
  note?: Note;
  onSubmit: (data: NoteFormData) => void | Promise<void>;
  isSubmitting?: boolean;
  defaultProjectId?: string;
}

export function NoteForm({ note, onSubmit, isSubmitting, defaultProjectId }: NoteFormProps) {
  const { data: projects = [] } = useProjects();
  const { data: persons = [] } = usePersons();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: note?.content || '',
      project_id: note?.project_id || defaultProjectId || undefined,
      person_id: note?.person_id || undefined,
    },
  });

  const project_id = watch('project_id');
  const person_id = watch('person_id');

  useEffect(() => {
    if (note) {
      setValue('content', note.content);
      setValue('project_id', note.project_id || undefined);
      setValue('person_id', note.person_id || undefined);
    }
  }, [note, setValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content">Notiz *</Label>
        <Textarea
          id="content"
          placeholder="Notiz schreiben... (Ctrl+Enter zum Speichern)"
          {...register('content')}
          onKeyDown={handleKeyDown}
          autoFocus
          className={`min-h-[300px] resize-none font-mono text-base ${errors.content ? 'border-red-500' : ''}`}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project_id">Projekt (optional)</Label>
          <Select
            value={project_id || 'none'}
            onValueChange={(value) => setValue('project_id', value === 'none' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Kein Projekt zugeordnet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Kein Projekt</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.project_id && (
            <p className="text-sm text-red-500">{errors.project_id.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="person_id">Person (optional)</Label>
          <Select
            value={person_id || 'none'}
            onValueChange={(value) => setValue('person_id', value === 'none' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Keine Person zugeordnet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Keine Person</SelectItem>
              {persons.map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  {person.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.person_id && (
            <p className="text-sm text-red-500">{errors.person_id.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Wird gespeichert...' : note ? 'Änderungen speichern' : 'Notiz erstellen'}
        </Button>
      </div>
    </form>
  );
}
