# React Rules

## Component Structure

### Functional Components Only
```typescript
// Good
export function ProjectCard({ project }: { project: Project }) {
  return <div>{project.name}</div>;
}

// Bad - no class components
export class ProjectCard extends React.Component {}
```

### File Organization
```
src/
├── components/
│   ├── layout/           # Layout components (AppLayout, AuthLayout)
│   ├── projects/         # Project feature components
│   ├── notes/           # Notes feature components
│   ├── persons/         # Persons feature components
│   └── shared/          # Shared/reusable components
├── pages/               # Page components (route level)
├── hooks/               # Custom hooks
└── lib/                 # Utilities, helpers
```

### Component File Structure
```typescript
// ProjectCard.tsx
import { useState } from 'react';
import type { Project } from '@/types/entities';

// 1. Types/Interfaces
interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

// 2. Component
export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  // 3. Hooks (grouped by type)
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // 4. Handlers
  const handleEdit = () => {
    onEdit?.(project);
  };

  // 5. Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

## Hooks Rules

### Order of Hooks
```typescript
function MyComponent() {
  // 1. Context hooks
  const { user } = useAuth();

  // 2. State hooks
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 3. Router hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // 4. React Query hooks
  const { data: projects } = useProjects();
  const createMutation = useCreateProject();

  // 5. Other hooks
  const debouncedSearch = useDebounce(searchTerm, 300);

  // 6. Effects (last!)
  useEffect(() => {
    // ...
  }, []);

  return <div />;
}
```

### Custom Hooks
```typescript
// hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types/entities';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// hooks/useCreateProject.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
```

## State Management

### TanStack Query (React Query) for Server State
```typescript
// ✅ Good - Server state with React Query
const { data: projects, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
});

// ❌ Bad - Managing server state with useState
const [projects, setProjects] = useState([]);
useEffect(() => {
  fetchProjects().then(setProjects);
}, []);
```

### Local State with useState
```typescript
// ✅ Good - UI state with useState
const [isModalOpen, setIsModalOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');

// ❌ Bad - Server state with useState (use React Query!)
const [projects, setProjects] = useState([]);
```

## Component Patterns

### Props Destructuring
```typescript
// Good
export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  return <div>{project.name}</div>;
}

// Bad
export function ProjectCard(props: ProjectCardProps) {
  return <div>{props.project.name}</div>;
}
```

### Conditional Rendering
```typescript
// Good - Early return for loading/error states
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;

return <ProjectList projects={data} />;

// Bad - Nested ternaries
return (
  <div>
    {isLoading ? (
      <LoadingSpinner />
    ) : error ? (
      <ErrorMessage />
    ) : (
      <ProjectList />
    )}
  </div>
);
```

### Children Prop
```typescript
// Good - Use children for composition
interface CardProps {
  children: React.ReactNode;
  title: string;
}

export function Card({ children, title }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

## Performance

### Memoization (Use Sparingly!)
```typescript
// Only memoize expensive calculations
const sortedProjects = useMemo(() => {
  return projects.sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}, [projects]);

// ❌ Don't memoize simple operations
const projectCount = useMemo(() => projects.length, [projects]); // Overkill!
```

### useCallback (Use Sparingly!)
```typescript
// Only when passing to memoized children or as dependency
const handleDelete = useCallback((id: string) => {
  deleteMutation.mutate(id);
}, [deleteMutation]);

// ❌ Don't useCallback everything
const handleClick = useCallback(() => {
  console.log('clicked');
}, []); // Unnecessary!
```

## Error Boundaries

```typescript
// components/shared/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}
```

## React Router v6

### Route Structure
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigation
```typescript
import { useNavigate, useParams } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleClick = () => {
    navigate(`/projects/${id}`);
  };

  return <button onClick={handleClick}>View Project</button>;
}
```

## Avoid

- ❌ Class components (use functional components)
- ❌ `defaultProps` (use default parameters instead)
- ❌ Index as key in lists (use unique IDs)
- ❌ Inline function definitions in JSX (define outside render)
- ❌ Overusing `useEffect` (often there's a better way)
- ❌ Premature optimization with `useMemo`/`useCallback`
