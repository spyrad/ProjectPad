import { PersonCard } from './PersonCard';
import { Users } from 'lucide-react';
import type { Person } from '@/types/entities';
import { useTranslation } from 'react-i18next';

interface PersonListProps {
  persons: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
}

export function PersonList({ persons, onEdit, onDelete }: PersonListProps) {
  const { t } = useTranslation();

  if (persons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-purple-100 p-6 mb-4">
          <Users className="h-12 w-12 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{t('persons.list.emptyTitle')}</h3>
        <p className="text-muted-foreground max-w-md">
          {t('persons.list.emptyDescription')}
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
