import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Willkommen zurück!</h1>
        <p className="text-muted-foreground mt-2">
          Angemeldet als {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/app/projects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <FolderKanban className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Projekte</CardTitle>
              <CardDescription>
                Verwalte deine Projekte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Erstelle, bearbeite und organisiere deine Projekte.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/app/persons">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Kontakte</CardTitle>
              <CardDescription>
                Verwalte deine Kontakte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Speichere und organisiere wichtige Kontakte.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/app/notes">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Notizen</CardTitle>
              <CardDescription>
                Erfasse deine Notizen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Schnelle Notizerfassung mit Notepad-Feeling.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
