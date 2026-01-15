import { z } from 'zod';
import i18n from './i18n';

// Helper function to get translation from validation section (now in main namespace)
function t(key: string): string {
  return i18n.t(`validation.${key}` as any);
}

// Factory functions that return schemas (reactive to language changes)
export function getEmailSchema() {
  return z.string().email(t('email.invalid'));
}

export function getPasswordSchema() {
  return z.string().min(8, t('password.min'));
}

export function getSignInSchema() {
  return z.object({
    email: getEmailSchema(),
    password: z.string().min(1, t('password.required')),
  });
}

export function getSignUpSchema() {
  return z
    .object({
      email: getEmailSchema(),
      password: getPasswordSchema(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('password.mismatch'),
      path: ['confirmPassword'],
    });
}

export function getProjectSchema() {
  return z.object({
    name: z.string().min(1, t('field.nameRequired')).max(100, t('field.nameTooLong')),
    description: z.string().max(500, t('field.descriptionTooLong')).optional(),
    status: z.enum(['active', 'paused', 'completed']),
    goals: z.string().max(1000, t('field.goalsTooLong')).optional(),
    deadline: z.string().optional(),
  });
}

export function getPersonSchema() {
  return z.object({
    name: z.string().min(1, t('field.nameRequired')).max(100, t('field.nameTooLong')),
    role: z.string().max(100, t('field.roleTooLong')).optional(),
    description: z.string().max(500, t('field.descriptionTooLong')).optional(),
    expertise: z.string().max(500, t('field.expertiseTooLong')).optional(),
    contact_info: z.string().max(200, t('field.contactTooLong')).optional(),
  });
}

export function getNoteSchema() {
  return z.object({
    content: z.string().min(1, t('field.contentRequired')),
    project_id: z.string().uuid().optional(),
    person_id: z.string().uuid().optional(),
  });
}

// Infer types from factory functions
export type SignInFormData = z.infer<ReturnType<typeof getSignInSchema>>;
export type SignUpFormData = z.infer<ReturnType<typeof getSignUpSchema>>;
export type ProjectFormData = z.infer<ReturnType<typeof getProjectSchema>>;
export type PersonFormData = z.infer<ReturnType<typeof getPersonSchema>>;
export type NoteFormData = z.infer<ReturnType<typeof getNoteSchema>>;
