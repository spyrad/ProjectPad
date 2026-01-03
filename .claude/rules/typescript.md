# TypeScript Rules

## General Guidelines

- **Strict mode enabled**: Always use TypeScript strict mode
- **No `any` types**: Use `unknown` or proper types instead
- **Explicit return types**: Always declare return types for functions
- **Interface over Type**: Prefer `interface` for object shapes, `type` for unions/intersections

## Naming Conventions

```typescript
// Interfaces: PascalCase with 'I' prefix optional (we don't use it)
interface User {
  id: string;
  name: string;
}

// Types: PascalCase
type UserRole = 'admin' | 'user';

// Enums: PascalCase (prefer const objects or unions instead)
const ProjectStatus = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  COMPLETED: 'completed',
} as const;

type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

// Functions: camelCase
function getUserById(id: string): User | null {}

// Constants: UPPER_SNAKE_CASE for true constants
const MAX_NOTES_PER_PROJECT = 1000;

// Variables: camelCase
const currentUser = useAuth();
```

## File Structure

```
src/
├── types/
│   ├── database.ts       # Supabase generated types
│   ├── entities.ts       # Domain entities (Project, Note, Person)
│   └── api.ts           # API request/response types
```

## Type Definitions

### Database Types
```typescript
// Use Supabase CLI to generate types
// supabase gen types typescript --project-id <id> > src/types/database.ts
import type { Database } from './database';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
```

### Domain Entities
```typescript
// src/types/entities.ts
export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: 'active' | 'archived' | 'completed';
  goals: string | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Note {
  id: string;
  user_id: string;
  project_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Person {
  id: string;
  user_id: string;
  name: string;
  role: string | null;
  description: string | null;
  expertise: string | null;
  contact_info: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
```

## Common Patterns

### Optional Chaining
```typescript
// Good
const userName = user?.profile?.name;

// Bad
const userName = user && user.profile && user.profile.name;
```

### Nullish Coalescing
```typescript
// Good
const displayName = user.name ?? 'Anonymous';

// Bad
const displayName = user.name || 'Anonymous'; // fails for empty string
```

### Type Guards
```typescript
// Good
function isProject(item: Project | Note): item is Project {
  return 'status' in item;
}

// Usage
if (isProject(item)) {
  console.log(item.status); // TypeScript knows it's Project
}
```

### Utility Types
```typescript
// Use built-in utility types
type PartialProject = Partial<Project>;
type ProjectWithoutId = Omit<Project, 'id'>;
type ProjectStatus = Pick<Project, 'status'>;
type ReadonlyProject = Readonly<Project>;
```

## Error Handling

```typescript
// Custom error types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Type-safe error handling
function handleError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}
```

## Async/Await

```typescript
// Always use async/await over .then()
async function fetchProject(id: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
}
```

## Avoid

- ❌ `any` type
- ❌ Type assertions (`as`) unless absolutely necessary
- ❌ Non-null assertions (`!`) unless you're 100% sure
- ❌ Implicit returns in multi-line functions
- ❌ Optional parameters before required ones
