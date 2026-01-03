import { z } from 'zod';

// Base schemas
export const emailSchema = z.string().email('Ungültige E-Mail-Adresse');
export const passwordSchema = z
  .string()
  .min(8, 'Passwort muss mindestens 8 Zeichen lang sein');

// Auth schemas
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Passwort ist erforderlich'),
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein',
    path: ['confirmPassword'],
  });

// Project schemas
export const projectSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100, 'Name zu lang'),
  description: z.string().max(500, 'Beschreibung zu lang').optional(),
  status: z.enum(['active', 'paused', 'completed']),
  goals: z.string().max(1000, 'Ziele zu lang').optional(),
  deadline: z.string().optional(),
});

// Person schemas
export const personSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100, 'Name zu lang'),
  role: z.string().max(100, 'Rolle zu lang').optional(),
  description: z.string().max(500, 'Beschreibung zu lang').optional(),
  expertise: z.string().max(500, 'Expertise zu lang').optional(),
  contact: z.string().max(200, 'Kontaktinfo zu lang').optional(),
});

// Note schemas
export const noteSchema = z.object({
  content: z.string().min(1, 'Inhalt ist erforderlich'),
  project_id: z.string().uuid().optional(),
  person_id: z.string().uuid().optional(),
});

// Infer types
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type PersonFormData = z.infer<typeof personSchema>;
export type NoteFormData = z.infer<typeof noteSchema>;
