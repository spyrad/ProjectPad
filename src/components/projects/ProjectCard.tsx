import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar, Eye, CheckCircle, Pause, Trophy } from 'lucide-react';
import type { Project } from '@/types/entities';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

const statusConfig: Record<
  Project['status'],
  { label: string; color: string; icon: React.ReactNode; gradient: string }
> = {
  active: {
    label: 'Aktiv',
    color: 'bg-green-500 hover:bg-green-600',
    icon: <CheckCircle className="h-3 w-3" />,
    gradient: 'bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20',
  },
  paused: {
    label: 'Pausiert',
    color: 'bg-yellow-500 hover:bg-yellow-600',
    icon: <Pause className="h-3 w-3" />,
    gradient: 'bg-gradient-to-br from-yellow-50/50 to-transparent dark:from-yellow-950/20',
  },
  completed: {
    label: 'Abgeschlossen',
    color: 'bg-blue-500 hover:bg-blue-600',
    icon: <Trophy className="h-3 w-3" />,
    gradient: 'bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20',
  },
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const navigate = useNavigate();
  const status = statusConfig[project.status];

  const formattedDeadline = project.deadline
    ? new Date(project.deadline).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null;

  return (
    <Card className={`hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${status.gradient} border-l-4 ${status.color.split(' ')[0].replace('bg-', 'border-')}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            {project.description && (
              <CardDescription className="mt-1">{project.description}</CardDescription>
            )}
          </div>
          <Badge className={`${status.color} flex items-center gap-1`}>
            {status.icon}
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {project.goals && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Ziele:</p>
              <p className="text-sm">{project.goals}</p>
            </div>
          )}
          {formattedDeadline && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Deadline: {formattedDeadline}</span>
            </div>
          )}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(`/app/projects/${project.id}`)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Anzeigen
            </Button>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(project)}
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
                onClick={() => onDelete(project.id)}
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
