import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { personSchema, type PersonFormData } from '@/lib/validations';
import type { Person } from '@/types/entities';
import { useTranslation } from 'react-i18next';

interface PersonFormProps {
  person?: Person;
  onSubmit: (data: PersonFormData) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function PersonForm({ person, onSubmit, isSubmitting }: PersonFormProps) {
  const { t } = useTranslation();
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
        <Label htmlFor="name">{t('persons.form.nameLabel')}</Label>
        <Input
          id="name"
          placeholder={t('persons.form.namePlaceholder')}
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">{t('persons.form.roleLabel')}</Label>
        <Input
          id="role"
          placeholder={t('persons.form.rolePlaceholder')}
          {...register('role')}
          className={errors.role ? 'border-red-500' : ''}
        />
        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('persons.form.descriptionLabel')}</Label>
        <Textarea
          id="description"
          placeholder={t('persons.form.descriptionPlaceholder')}
          rows={3}
          {...register('description')}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertise">{t('persons.form.expertiseLabel')}</Label>
        <Textarea
          id="expertise"
          placeholder={t('persons.form.expertisePlaceholder')}
          rows={3}
          {...register('expertise')}
          className={errors.expertise ? 'border-red-500' : ''}
        />
        {errors.expertise && (
          <p className="text-sm text-red-500">{errors.expertise.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">{t('persons.form.contactLabel')}</Label>
        <Input
          id="contact"
          placeholder={t('persons.form.contactPlaceholder')}
          {...register('contact')}
          className={errors.contact ? 'border-red-500' : ''}
        />
        {errors.contact && (
          <p className="text-sm text-red-500">{errors.contact.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('persons.form.submitting') : person ? t('persons.form.submitEdit') : t('persons.form.submitCreate')}
        </Button>
      </div>
    </form>
  );
}
