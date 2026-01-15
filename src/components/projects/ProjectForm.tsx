import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projectSchema, type ProjectFormData } from '@/lib/validations';
import type { Project } from '@/types/entities';
import { useTranslation } from 'react-i18next';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function ProjectForm({ project, onSubmit, isSubmitting }: ProjectFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || 'active',
      goals: project?.goals || '',
      deadline: project?.deadline || '',
    },
  });

  const status = watch('status');

  useEffect(() => {
    if (project) {
      setValue('name', project.name);
      setValue('description', project.description || '');
      setValue('status', project.status);
      setValue('goals', project.goals || '');
      setValue('deadline', project.deadline || '');
    }
  }, [project, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('projects.form.nameLabel')}</Label>
        <Input
          id="name"
          placeholder={t('projects.form.namePlaceholder')}
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('projects.form.descriptionLabel')}</Label>
        <Textarea
          id="description"
          placeholder={t('projects.form.descriptionPlaceholder')}
          rows={3}
          {...register('description')}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">{t('projects.form.statusLabel')}</Label>
        <Select
          value={status}
          onValueChange={(value) => setValue('status', value as Project['status'])}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('projects.form.statusPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">{t('status.active')}</SelectItem>
            <SelectItem value="paused">{t('status.paused')}</SelectItem>
            <SelectItem value="completed">{t('status.completed')}</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">{t('projects.form.goalsLabel')}</Label>
        <Textarea
          id="goals"
          placeholder={t('projects.form.goalsPlaceholder')}
          rows={3}
          {...register('goals')}
          className={errors.goals ? 'border-red-500' : ''}
        />
        {errors.goals && (
          <p className="text-sm text-red-500">{errors.goals.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">{t('projects.form.deadlineLabel')}</Label>
        <Input
          id="deadline"
          type="date"
          {...register('deadline')}
          className={errors.deadline ? 'border-red-500' : ''}
        />
        {errors.deadline && (
          <p className="text-sm text-red-500">{errors.deadline.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('projects.form.submitting') : project ? t('projects.form.submitEdit') : t('projects.form.submitCreate')}
        </Button>
      </div>
    </form>
  );
}
