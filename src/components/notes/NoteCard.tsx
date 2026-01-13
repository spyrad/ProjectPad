import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, FileText } from 'lucide-react';
import type { Note } from '@/types/entities';

interface NoteCardProps {
  note: Note;
  onEdit?: (note: Note) => void;
  onDelete?: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = new Date(note.created_at).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Truncate content if too long
  const displayContent = note.content.length > 300
    ? note.content.substring(0, 300) + '...'
    : note.content;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-900/20 border-l-4 border-l-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span>{formattedDate} um {formattedTime}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm whitespace-pre-wrap">{displayContent}</p>
          <div className="flex items-center gap-2 pt-2 border-t">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(note)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Bearbeiten
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(note.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Löschen
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
