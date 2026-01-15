import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { LogOut, FolderKanban, Users, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AppLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/app" className="text-xl font-bold">
                {t('common.appName')}
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  to="/app/projects"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FolderKanban className="h-4 w-4" />
                  {t('navigation.projects')}
                </Link>
                <Link
                  to="/app/persons"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Users className="h-4 w-4" />
                  {t('navigation.persons')}
                </Link>
                <Link
                  to="/app/notes"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  {t('navigation.notes')}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <LanguageSwitcher />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                {t('navigation.logout')}
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
