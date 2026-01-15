import { NoteCard } from './NoteCard';
import { FileText } from 'lucide-react';
import type { Note } from '@/types/entities';
import { useTranslation } from 'react-i18next';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  const { t } = useTranslation();

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-slate-100 p-6 mb-4">
          <FileText className="h-12 w-12 text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{t('notes.list.emptyTitle')}</h3>
        <p className="text-muted-foreground max-w-md">
          {t('notes.list.emptyDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
