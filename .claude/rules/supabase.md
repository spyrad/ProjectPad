# Supabase Rules

## Setup & Configuration

### Client Initialization
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### Environment Variables
```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Authentication

### Auth Context
```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## Database Queries

### Basic CRUD Operations

#### Read (Select)
```typescript
// Get all projects (excluding soft deleted)
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .is('deleted_at', null)
  .order('created_at', { ascending: false });

// Get single project by ID
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .is('deleted_at', null)
  .single();

// Get project with related persons (join)
const { data, error } = await supabase
  .from('projects')
  .select(`
    *,
    project_persons (
      person:persons (*)
    )
  `)
  .eq('id', projectId)
  .single();
```

#### Create (Insert)
```typescript
const { data, error } = await supabase
  .from('projects')
  .insert({
    name: 'New Project',
    description: 'Project description',
    status: 'active',
    user_id: user.id, // Set automatically by RLS trigger
  })
  .select()
  .single();
```

#### Update
```typescript
const { data, error } = await supabase
  .from('projects')
  .update({
    name: 'Updated Name',
    updated_at: new Date().toISOString(),
  })
  .eq('id', projectId)
  .select()
  .single();
```

#### Delete (Soft Delete)
```typescript
// Use RPC function for soft delete
const { error } = await supabase.rpc('soft_delete_project', {
  project_id: projectId,
});

// Hard delete (use sparingly!)
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

### RPC Functions

```typescript
// Call custom database function
const { data, error } = await supabase.rpc('search_notes_fulltext', {
  search_query: 'meeting',
});
```

## Row Level Security (RLS)

### RLS Policy Pattern

All tables must have RLS enabled with user-based isolation:

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own projects
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Policy: Users can insert own projects
CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update own projects
CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete own projects
CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);
```

### Automatic user_id Population

```sql
-- Trigger to set user_id automatically
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_user_id_on_insert
  BEFORE INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();
```

## Real-time Subscriptions

```typescript
// Subscribe to changes in projects table
useEffect(() => {
  const channel = supabase
    .channel('projects-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'projects',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        console.log('Change received!', payload);
        // Invalidate React Query cache
        queryClient.invalidateQueries({ queryKey: ['projects'] });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user.id]);
```

## Error Handling

```typescript
// Type-safe error handling
import { PostgrestError } from '@supabase/supabase-js';

async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .is('deleted_at', null);

  if (error) {
    // error is typed as PostgrestError
    console.error('Database error:', error.message);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return data;
}
```

## Best Practices

### Always Check for Soft Deletes
```typescript
// ✅ Good - Exclude soft deleted records
const { data } = await supabase
  .from('projects')
  .select('*')
  .is('deleted_at', null);

// ❌ Bad - Includes soft deleted records
const { data } = await supabase
  .from('projects')
  .select('*');
```

### Use Typed Queries
```typescript
// ✅ Good - Type-safe query
const { data } = await supabase
  .from('projects')
  .select('*')
  .returns<Project[]>();

// ❌ Bad - Untyped query
const { data } = await supabase
  .from('projects')
  .select('*');
```

### Handle Errors Properly
```typescript
// ✅ Good - Check error first
const { data, error } = await supabase.from('projects').select('*');
if (error) throw error;
return data;

// ❌ Bad - Assume data exists
const { data } = await supabase.from('projects').select('*');
return data; // Could be null if error occurred!
```

### Use React Query for Data Fetching
```typescript
// ✅ Good - React Query handles caching, loading, errors
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .is('deleted_at', null);
    if (error) throw error;
    return data;
  },
});

// ❌ Bad - Manual state management
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(false);
useEffect(() => {
  setLoading(true);
  supabase.from('projects').select('*').then(/* ... */);
}, []);
```

## Avoid

- ❌ Bypassing RLS (use service role key only in backend/Edge Functions)
- ❌ Storing sensitive data in client-side code
- ❌ Forgetting to filter soft deleted records
- ❌ Not handling errors from Supabase calls
- ❌ Using hard deletes when soft delete is available
- ❌ Manually managing auth tokens (let Supabase SDK handle it)
