import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Mail, Briefcase, Lightbulb, Eye } from 'lucide-react';
import type { Person } from '@/types/entities';
import { useTranslation } from 'react-i18next';

interface PersonCardProps {
  person: Person;
  onEdit?: (person: Person) => void;
  onDelete?: (id: string) => void;
}

export function PersonCard({ person, onEdit, onDelete }: PersonCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-gradient-to-br from-purple-50/30 to-transparent dark:from-purple-950/20 border-l-4 border-l-purple-500/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{person.name}</CardTitle>
            {person.role && (
              <CardDescription className="mt-1 flex items-center gap-2">
                <Briefcase className="h-3 w-3 text-purple-600" />
                {person.role}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {person.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{t('persons.card.descriptionLabel')}</p>
              <p className="text-sm">{person.description}</p>
            </div>
          )}
          {person.expertise && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                {t('persons.card.expertiseLabel')}
              </p>
              <p className="text-sm">{person.expertise}</p>
            </div>
          )}
          {person.contact && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{person.contact}</span>
            </div>
          )}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(`/app/persons/${person.id}`)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {t('persons.card.viewButton')}
            </Button>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(person)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                {t('persons.card.editButton')}
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(person.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                {t('persons.card.deleteButton')}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
