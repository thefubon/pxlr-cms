import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            PXLR <span className="text-primary">CMS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Современная система управления контентом с мощной админ-панелью 
            и красивым фронтендом
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                MDX Контент
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Создавайте и управляйте контентом в формате MDX с мощным редактором
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Быстрый API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fastify backend обеспечивает молниеносную скорость загрузки
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Современный UI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Next.js 15 + shadcn/ui для красивого и отзывчивого интерфейса
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/posts">
              <FileText className="mr-2 h-5 w-5" />
              Посмотреть посты
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Или перейдите в{' '}
            <a 
              href="https://admin.pxlr.ru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              админ-панель
            </a>
            {' '}для управления контентом
          </p>
        </div>
      </div>
    </div>
  );
}
