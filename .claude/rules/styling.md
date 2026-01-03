# Styling Rules - Tailwind CSS + shadcn/ui

## Setup

### Tailwind Configuration
```typescript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## shadcn/ui Components

### Installation
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add badge
```

### Always Use shadcn/ui Components
```typescript
// ✅ Good - Use shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projekt erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Projektname" />
        <Button>Erstellen</Button>
      </CardContent>
    </Card>
  );
}

// ❌ Bad - Don't create custom button/input components
function MyComponent() {
  return <button className="px-4 py-2 bg-blue-500">Click me</button>;
}
```

## Tailwind CSS Patterns

### Class Ordering (Use Prettier Plugin)
```bash
npm install -D prettier prettier-plugin-tailwindcss
```

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Responsive Design
```typescript
// Mobile-first approach (but we're building desktop-first for ProjectPad)
<div className="w-full md:w-1/2 lg:w-1/3">
  Content
</div>

// Desktop-first for ProjectPad
<div className="w-1/3 md:w-1/2 sm:w-full">
  Content
</div>
```

### Common Utility Patterns
```typescript
// Flexbox
<div className="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// Spacing
<div className="p-4">Padding all sides</div>
<div className="px-4 py-2">Horizontal & vertical padding</div>
<div className="space-y-4">Vertical spacing between children</div>

// Typography
<h1 className="text-2xl font-bold">Heading</h1>
<p className="text-sm text-muted-foreground">Description</p>

// Borders
<div className="border border-border rounded-lg">Card</div>

// Shadows
<div className="shadow-sm hover:shadow-md transition-shadow">Hover effect</div>
```

### Conditional Classes (use cn utility)
```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```typescript
// Usage
import { cn } from '@/lib/utils';

<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-primary text-primary-foreground",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  Content
</div>
```

## Component Styling Patterns

### Card Component
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        {project.description && (
          <CardDescription>{project.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge>{project.status}</Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(project.created_at).toLocaleDateString('de-DE')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Button Variants
```typescript
import { Button } from '@/components/ui/button';

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Input Variants
```typescript
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Standard input
<Input type="text" placeholder="Projektname" />

// Email input
<Input type="email" placeholder="Email" />

// Password input
<Input type="password" placeholder="Passwort" />

// Textarea (for notes with "notepad feeling")
<Textarea
  placeholder="Notiz schreiben..."
  className="min-h-[200px] resize-none font-mono"
  autoFocus
/>
```

### Dialog/Modal
```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Projekt erstellen</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Neues Projekt</DialogTitle>
      <DialogDescription>
        Erstelle ein neues Projekt für deine Notizen
      </DialogDescription>
    </DialogHeader>
    <CreateProjectForm />
    <DialogFooter>
      <Button variant="outline">Abbrechen</Button>
      <Button type="submit">Erstellen</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Layout Patterns

### Page Layout
```typescript
// src/components/layout/AppLayout.tsx
export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-bold">ProjectPad</h1>
            <div className="flex items-center gap-4">
              <Link to="/projects">Projekte</Link>
              <Link to="/persons">Kontakte</Link>
              <Link to="/notes">Notizen</Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
```

### Container
```typescript
// Max-width container
<div className="container mx-auto px-4 py-8">
  Content
</div>

// Full-width container
<div className="w-full px-4 py-8">
  Content
</div>
```

### Section Spacing
```typescript
<section className="space-y-6">
  <h2 className="text-2xl font-bold">Projekte</h2>
  <div className="grid grid-cols-3 gap-4">
    {/* Cards */}
  </div>
</section>
```

## ProjectPad-Specific Patterns

### Notepad-Feeling Textarea
```typescript
// Large textarea with auto-focus and monospace font
<Textarea
  placeholder="Notiz schreiben... (Ctrl+Enter zum Speichern)"
  className="min-h-[300px] resize-none font-mono text-base"
  autoFocus
  onKeyDown={(e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit();
    }
  }}
/>
```

### Timeline Grouping
```typescript
<div className="space-y-6">
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Heute</h3>
    <div className="space-y-2">
      {todayNotes.map(note => <NoteCard key={note.id} note={note} />)}
    </div>
  </div>
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Gestern</h3>
    <div className="space-y-2">
      {yesterdayNotes.map(note => <NoteCard key={note.id} note={note} />)}
    </div>
  </div>
</div>
```

### Empty State
```typescript
import { FileText } from 'lucide-react';

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
```

## Icons

### Use lucide-react
```bash
npm install lucide-react
```

```typescript
import { Plus, Edit, Trash2, Search, FileText, Users } from 'lucide-react';

<Button>
  <Plus className="h-4 w-4 mr-2" />
  Erstellen
</Button>

<Button variant="ghost" size="icon">
  <Edit className="h-4 w-4" />
</Button>
```

## Best Practices

### 1. Use Utility Classes
```typescript
// ✅ Good - Tailwind utilities
<div className="flex items-center gap-4 p-4 rounded-lg border">

// ❌ Bad - Custom CSS
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
```

### 2. Use shadcn/ui Components
```typescript
// ✅ Good - shadcn/ui Button
import { Button } from '@/components/ui/button';
<Button>Click me</Button>

// ❌ Bad - Custom button
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

### 3. Use cn() for Conditional Classes
```typescript
// ✅ Good - cn() helper
<div className={cn("p-4", isActive && "bg-primary")}>

// ❌ Bad - Manual string concatenation
<div className={`p-4 ${isActive ? 'bg-primary' : ''}`}>
```

### 4. Consistent Spacing
```typescript
// ✅ Good - Tailwind spacing scale (4, 8, 12, 16, etc.)
<div className="space-y-4">
<div className="gap-4">
<div className="p-4">

// ❌ Bad - Arbitrary values
<div className="space-y-[13px]">
```

## Avoid

- ❌ Custom CSS files (use Tailwind utilities)
- ❌ Inline styles (use Tailwind classes)
- ❌ Custom button/input components (use shadcn/ui)
- ❌ Arbitrary values unless absolutely necessary
- ❌ !important (fix specificity issues instead)
- ❌ Complex custom components (check shadcn/ui first)
