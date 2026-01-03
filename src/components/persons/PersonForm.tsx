import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { personSchema, type PersonFormData } from '@/lib/validations';
import type { Person } from '@/types/entities';

interface PersonFormProps {
  person?: Person;
  onSubmit: (data: PersonFormData) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function PersonForm({ person, onSubmit, isSubmitting }: PersonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: person?.name || '',
      role: person?.role || '',
      description: person?.description || '',
      expertise: person?.expertise || '',
      contact: person?.contact || '',
    },
  });

  useEffect(() => {
    if (person) {
      setValue('name', person.name);
      setValue('role', person.role || '');
      setValue('description', person.description || '');
      setValue('expertise', person.expertise || '');
      setValue('contact', person.contact || '');
    }
  }, [person, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          placeholder="Max Mustermann"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rolle</Label>
        <Input
          id="role"
          placeholder="z.B. Projektmanager, Entwickler, Designer..."
          {...register('role')}
          className={errors.role ? 'border-red-500' : ''}
        />
        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Textarea
          id="description"
          placeholder="Kurze Beschreibung der Person..."
          rows={3}
          {...register('description')}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertise">Expertise</Label>
        <Textarea
          id="expertise"
          placeholder="Fachkenntnisse und Kompetenzen..."
          rows={3}
          {...register('expertise')}
          className={errors.expertise ? 'border-red-500' : ''}
        />
        {errors.expertise && (
          <p className="text-sm text-red-500">{errors.expertise.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Kontaktinformationen</Label>
        <Input
          id="contact"
          placeholder="E-Mail, Telefon, etc."
          {...register('contact')}
          className={errors.contact ? 'border-red-500' : ''}
        />
        {errors.contact && (
          <p className="text-sm text-red-500">{errors.contact.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Wird gespeichert...' : person ? 'Änderungen speichern' : 'Person erstellen'}
        </Button>
      </div>
    </form>
  );
}
