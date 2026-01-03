# Forms Rules - React Hook Form + Zod

## Setup

### Install Dependencies
```bash
npm install react-hook-form zod @hookform/resolvers
```

## Form Pattern

### Basic Form with Zod Validation
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define Zod schema
const projectSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100),
  description: z.string().optional(),
  status: z.enum(['active', 'archived', 'completed']),
  goals: z.string().optional(),
  deadline: z.string().optional(),
});

// 2. Infer TypeScript type from schema
type ProjectFormData = z.infer<typeof projectSchema>;

// 3. Component with form
export function ProjectForm({ onSubmit }: { onSubmit: (data: ProjectFormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: 'active',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Speichern...' : 'Speichern'}
      </button>
    </form>
  );
}
```

## Zod Schema Patterns

### Common Validations
```typescript
import { z } from 'zod';

const schema = z.object({
  // Required string
  name: z.string().min(1, 'Name ist erforderlich'),

  // Optional string
  description: z.string().optional(),

  // String with length constraints
  title: z.string().min(3).max(100),

  // Email
  email: z.string().email('Ungültige E-Mail-Adresse'),

  // Enum
  status: z.enum(['active', 'archived', 'completed']),

  // Number
  age: z.number().min(0).max(120),

  // Date string (ISO)
  deadline: z.string().datetime().optional(),

  // Boolean
  isActive: z.boolean(),

  // Array
  tags: z.array(z.string()).min(1, 'Mindestens ein Tag erforderlich'),

  // Nested object
  address: z.object({
    street: z.string(),
    city: z.string(),
  }).optional(),
});
```

### Reusable Schemas
```typescript
// src/lib/validations.ts

// Base schemas
export const emailSchema = z.string().email('Ungültige E-Mail-Adresse');
export const passwordSchema = z
  .string()
  .min(8, 'Passwort muss mindestens 8 Zeichen lang sein');

// Entity schemas
export const projectSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['active', 'archived', 'completed']),
  goals: z.string().max(1000).optional(),
  deadline: z.string().datetime().optional(),
});

export const noteSchema = z.object({
  content: z.string().min(1, 'Inhalt ist erforderlich'),
  project_id: z.string().uuid().optional(),
});

export const personSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100),
  role: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  expertise: z.string().max(500).optional(),
  contact_info: z.string().max(200).optional(),
});

// Auth schemas
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwörter stimmen nicht überein',
  path: ['confirmPassword'],
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Passwort ist erforderlich'),
});
```

## Form Patterns

### Edit Form (with Default Values)
```typescript
interface EditProjectFormProps {
  project: Project;
  onSubmit: (data: ProjectFormData) => void;
}

export function EditProjectForm({ project, onSubmit }: EditProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description ?? '',
      status: project.status,
      goals: project.goals ?? '',
      deadline: project.deadline ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <button type="submit" disabled={isSubmitting || !isDirty}>
        Änderungen speichern
      </button>
    </form>
  );
}
```

### Form with Reset
```typescript
export function CreateNoteForm({ onSubmit }: { onSubmit: (data: NoteFormData) => void }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  const handleFormSubmit = async (data: NoteFormData) => {
    await onSubmit(data);
    reset(); // Clear form after successful submission
  };

  return <form onSubmit={handleSubmit(handleFormSubmit)}>{/* ... */}</form>;
}
```

### Form with React Query Mutation
```typescript
import { useCreateProject } from '@/hooks/useProjects';

export function CreateProjectForm() {
  const createMutation = useCreateProject();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { status: 'active' },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      await createMutation.mutateAsync(data);
      reset();
      // Show success toast/notification
    } catch (error) {
      // Show error toast/notification
      console.error('Failed to create project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Erstellen...' : 'Projekt erstellen'}
      </button>
      {createMutation.isError && (
        <p className="text-red-500">Fehler beim Erstellen des Projekts</p>
      )}
    </form>
  );
}
```

## shadcn/ui Integration

### Form Component with shadcn/ui
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function ProjectFormWithShadcn({ onSubmit }: { onSubmit: (data: ProjectFormData) => void }) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { status: 'active' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projektname</FormLabel>
              <FormControl>
                <Input placeholder="Mein Projekt" {...field} />
              </FormControl>
              <FormDescription>
                Der Name deines Projekts (max. 100 Zeichen)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Textarea placeholder="Projektbeschreibung..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Speichern...' : 'Speichern'}
        </Button>
      </form>
    </Form>
  );
}
```

## Advanced Patterns

### Conditional Validation
```typescript
const noteSchema = z.object({
  content: z.string().min(1),
  project_id: z.string().uuid().optional(),
  person_ids: z.array(z.string().uuid()).optional(),
}).refine(
  (data) => data.project_id || (data.person_ids && data.person_ids.length > 0),
  {
    message: 'Notiz muss entweder einem Projekt oder einer Person zugeordnet sein',
    path: ['project_id'],
  }
);
```

### Transform Data
```typescript
const projectSchema = z.object({
  name: z.string().min(1).transform((val) => val.trim()),
  deadline: z.string().transform((val) => {
    // Convert date string to ISO string
    return val ? new Date(val).toISOString() : null;
  }),
});
```

### Watch Field Changes
```typescript
function MyForm() {
  const { register, watch } = useForm();
  const projectId = watch('project_id');

  // React to field changes
  useEffect(() => {
    if (projectId) {
      console.log('Project selected:', projectId);
    }
  }, [projectId]);

  return <form>{/* ... */}</form>;
}
```

## Best Practices

### 1. Always Use Zod Schema
```typescript
// ✅ Good - Type-safe with validation
const form = useForm<ProjectFormData>({
  resolver: zodResolver(projectSchema),
});

// ❌ Bad - No validation
const form = useForm<ProjectFormData>();
```

### 2. Infer Types from Schema
```typescript
// ✅ Good - Single source of truth
const schema = z.object({ name: z.string() });
type FormData = z.infer<typeof schema>;

// ❌ Bad - Duplicate type definition
const schema = z.object({ name: z.string() });
interface FormData { name: string }
```

### 3. Use Default Values
```typescript
// ✅ Good - Controlled inputs
const form = useForm({
  defaultValues: { name: '', status: 'active' },
});

// ❌ Bad - Uncontrolled inputs (undefined)
const form = useForm();
```

### 4. Handle Loading States
```typescript
// ✅ Good - Disable submit during submission
<button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? 'Speichern...' : 'Speichern'}
</button>

// ❌ Bad - No loading state
<button type="submit">Speichern</button>
```

## Avoid

- ❌ Manual validation (use Zod schemas)
- ❌ Uncontrolled inputs (always use `register` or `control`)
- ❌ Ignoring form errors
- ❌ Not handling loading states
- ❌ Mixing controlled and uncontrolled inputs
