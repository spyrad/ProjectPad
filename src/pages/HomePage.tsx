import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">ProjectPad</CardTitle>
          <CardDescription className="text-center">
            Dein persönlicher Projekt-Assistent mit Notepad-Feeling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              ✅ Projekt-Bootstrap abgeschlossen
            </p>
            <p className="text-sm text-muted-foreground">
              🚀 Bereit für Supabase Setup
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate('/login')} className="w-full">
              Anmelden
            </Button>
            <Button onClick={() => navigate('/signup')} variant="outline" className="w-full">
              Registrieren
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
