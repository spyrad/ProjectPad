import { PersonCard } from './PersonCard';
import type { Person } from '@/types/entities';

interface PersonListProps {
  persons: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
}

export function PersonList({ persons, onEdit, onDelete }: PersonListProps) {
  if (persons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">
          Noch keine Kontakte vorhanden.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Erstelle deinen ersten Kontakt, um loszulegen!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {persons.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
