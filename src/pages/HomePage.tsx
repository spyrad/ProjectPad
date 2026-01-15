import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { FolderKanban, Users, StickyNote, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation('translation')

  const features = [
    {
      icon: FolderKanban,
      title: t('landing.feature1Title'),
      description: t('landing.feature1Desc'),
    },
    {
      icon: Users,
      title: t('landing.feature2Title'),
      description: t('landing.feature2Desc'),
    },
    {
      icon: StickyNote,
      title: t('landing.feature3Title'),
      description: t('landing.feature3Desc'),
    },
    {
      icon: Clock,
      title: t('landing.feature4Title'),
      description: t('landing.feature4Desc'),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo & Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              {t('common.appName')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t('landing.tagline')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button onClick={() => navigate('/signup')} size="lg" className="w-full sm:w-auto px-8">
              {t('landing.ctaStart')}
            </Button>
            <Button onClick={() => navigate('/login')} variant="outline" size="lg" className="w-full sm:w-auto px-8">
              {t('landing.ctaLogin')}
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Footer Text */}
          <div className="pt-8 text-sm text-muted-foreground">
            <p>{t('landing.footerText')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
