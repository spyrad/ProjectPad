import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, Users, FileText, CheckCircle, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { useNotes } from '@/hooks/useNotes';
import { usePersons } from '@/hooks/usePersons';
import { formatRelativeDate } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: notes, isLoading: notesLoading } = useNotes();
  const { data: persons, isLoading: personsLoading } = usePersons();

  // Calculate statistics
  const stats = {
    activeProjects: projects?.filter((p) => p.status === 'active').length ?? 0,
    completedProjects: projects?.filter((p) => p.status === 'completed').length ?? 0,
    pausedProjects: projects?.filter((p) => p.status === 'paused').length ?? 0,
    totalNotes: notes?.length ?? 0,
    totalPersons: persons?.length ?? 0,
  };

  // Get recent notes (last 5)
  const recentNotes = notes?.slice(0, 5) ?? [];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.welcomeBack')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('dashboard.loggedInAs', { email: user?.email })}
        </p>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.overview')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {t('dashboard.statsActive')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{projectsLoading ? '-' : stats.activeProjects}</p>
              <p className="text-xs text-muted-foreground">{t('dashboard.statsProjects')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                {t('dashboard.statsCompleted')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{projectsLoading ? '-' : stats.completedProjects}</p>
              <p className="text-xs text-muted-foreground">{t('dashboard.statsProjects')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Pause className="h-4 w-4 text-yellow-500" />
                {t('dashboard.statsPaused')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{projectsLoading ? '-' : stats.pausedProjects}</p>
              <p className="text-xs text-muted-foreground">{t('dashboard.statsProjects')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t('dashboard.statsNotes')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{notesLoading ? '-' : stats.totalNotes}</p>
              <p className="text-xs text-muted-foreground">{t('dashboard.statsTotal')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {t('dashboard.statsPersons')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{personsLoading ? '-' : stats.totalPersons}</p>
              <p className="text-xs text-muted-foreground">{t('dashboard.statsTotal')}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Notes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('dashboard.recentNotes')}</h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/app/notes">{t('dashboard.viewAll')}</Link>
          </Button>
        </div>

        {notesLoading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{t('dashboard.loadingNotes')}</p>
            </CardContent>
          </Card>
        ) : recentNotes.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{t('dashboard.noNotes')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <p className="text-sm line-clamp-2">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatRelativeDate(note.created_at)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.quickAccess')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/app/projects">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <FolderKanban className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{t('navigation.projects')}</CardTitle>
                <CardDescription>
                  {t('dashboard.manageProjects')}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/app/persons">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{t('navigation.persons')}</CardTitle>
                <CardDescription>
                  {t('dashboard.managePersons')}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/app/notes">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{t('navigation.notes')}</CardTitle>
                <CardDescription>
                  {t('dashboard.captureNotes')}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
