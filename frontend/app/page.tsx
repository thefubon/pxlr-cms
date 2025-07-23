import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import { 
  FileText, 
  Zap, 
  Globe, 
  Code,
  Code2, 
  Users, 
  Shield, 
  ArrowRight,
  Calendar,
  User,
  ChevronRight,
  Sparkles,
  Layers,
  Edit3,
  Star,
  Rocket,
  Palette,
  Database,
  Settings,
  Heart,
  Github,
  Terminal,
  BookOpen,
  Coffee,
  Lightbulb,
  Target,
  TrendingUp
} from 'lucide-react';

// Конфигурация URL для разных сред
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Функция для получения URL в зависимости от среды
function getAdminUrl(): string {
  return IS_PRODUCTION ? 'https://admin.pxlr.ru' : 'http://localhost:5173';
}



// Функция для правильных склонений
function getPlural(number: number, one: string, few: string, many: string): string {
  const n = Math.abs(number);
  const n10 = n % 10;
  const n100 = n % 100;
  
  if (n10 === 1 && n100 !== 11) {
    return one;
  } else if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) {
    return few;
  } else {
    return many;
  }
}

export default function Home() {
  // Получаем данные
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3);
  const allTags = getAllTags();

  // Статистика
  const stats = [
    {
      number: allPosts.length,
      label: getPlural(allPosts.length, 'пост', 'поста', 'постов'),
      icon: FileText,
      description: 'Опубликовано'
    },
    {
      number: 3,
      label: getPlural(3, 'редактор', 'редактора', 'редакторов'),
      icon: Edit3,
      description: 'Доступно'
    },
    {
      number: allTags.length,
      label: getPlural(allTags.length, 'тег', 'тега', 'тегов'),
      icon: Settings,
      description: 'Тегов'
    },
    {
      number: 100,
      label: '% TypeScript',
      icon: Shield,
      description: 'Типобезопасность'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,0.6))]"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
                        {/* Badge */}
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-6 py-3 text-sm font-medium shadow-lg">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300">Современная CMS нового поколения</span>
                <Badge variant="secondary" className="ml-2 text-xs">v0.4.1</Badge>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-950/50 dark:to-blue-950/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-2 text-sm font-medium shadow-md">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Обновлено в v0.4.1:</span>
                </div>
                <span className="text-blue-700 dark:text-blue-300 font-medium">Markdown Редактор</span>
              </div>
            </div>

            {/* Hero Title */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  PXLR{" "}
                </span>
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                  CMS
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
                Революционная система управления контентом на
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> Next.js 15</span>,
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> Vite+React</span>,
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold"> Tailwind CSS</span> с 
                <span className="text-slate-800 dark:text-slate-200 font-semibold"> 3 редакторами</span>,
                <span className="text-orange-600 dark:text-orange-400 font-semibold"> мульти-тегами</span>,
                <span className="text-pink-600 dark:text-pink-400 font-semibold"> категориями</span>,
                <span className="text-primary font-semibold"> MDX</span> и 
                <span className="text-purple-600 dark:text-purple-400 font-semibold"> TypeScript</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Link href="/posts">
                  <Rocket className="mr-2 h-5 w-5" />
                  Исследовать контент
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 transition-all">
                <a href={getAdminUrl()} target="_blank" rel="noopener noreferrer">
                  <Terminal className="mr-2 h-5 w-5" />
                  Админ-панель
                </a>
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 text-sm font-medium">
              <Code2 className="h-4 w-4" />
              Технологический стек
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Построено на лучших технологиях
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Мы используем только проверенные и современные решения для максимальной производительности
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tech Stack Cards */}
            <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Fastify Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Высокопроизводительный Node.js фреймворк с автоматической валидацией схем и сериализацией JSON.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Next.js 15</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Современный React фреймворк с App Router, Server Components и Turbopack для мгновенной разработки.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Tailwind CSS v4</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Utility-first CSS фреймворк с улучшенной производительностью и новыми возможностями кастомизации.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">TypeScript</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Строгая типизация на всех уровнях приложения обеспечивает надёжность и удобство разработки.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Vite.js</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Сверхбыстрый инструмент сборки с мгновенным HMR и оптимизированной производительностью для React админ-панели.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">MDX Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Создавайте интерактивный контент, объединяя Markdown с React компонентами для богатого пользовательского опыта.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Structure Section */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 text-sm font-medium">
              <Layers className="h-4 w-4" />
              Архитектура
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Структура проекта
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Модульная архитектура с четким разделением ответственности для максимальной производительности
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Backend */}
              <div className="relative">
                <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50 hover:shadow-xl transition-all group">
                  <CardHeader className="text-center pb-6">
                    <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Database className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">Backend</CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-300">
                      Fastify + TypeScript
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>REST API эндпоинты</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Загрузка изображений</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Управление настройками</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Валидация данных</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Admin */}
              <div className="relative">
                <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/50 hover:shadow-xl transition-all group">
                  <CardHeader className="text-center pb-6">
                    <div className="h-20 w-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Settings className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-orange-800 dark:text-orange-200">Admin</CardTitle>
                    <CardDescription className="text-orange-600 dark:text-orange-300">
                      Vite + React + TypeScript
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>3 типа редакторов</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Управление постами</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Теги и категории</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Настройки системы</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Hot Module Replacement</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Frontend */}
              <div className="relative">
                <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/50 hover:shadow-xl transition-all group">
                  <CardHeader className="text-center pb-6">
                    <div className="h-20 w-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Globe className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-green-800 dark:text-green-200">Frontend</CardTitle>
                    <CardDescription className="text-green-600 dark:text-green-300">
                      Next.js 15 + Turbopack
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Публичный сайт</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>MDX рендеринг</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>SEO оптимизация</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Server Components</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Data Flow */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Content Storage */}
              <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-purple-800 dark:text-purple-200">Контент</CardTitle>
                  <CardDescription className="text-purple-600 dark:text-purple-300">
                    MDX файлы + JSON метаданные
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Code className="h-4 w-4 text-purple-500" />
                    <span>backend/content/*.mdx</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Code className="h-4 w-4 text-purple-500" />
                    <span>frontend/content/*.mdx</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Code className="h-4 w-4 text-purple-500" />
                    <span>backend/settings.json</span>
                  </div>
                </CardContent>
              </Card>

              {/* Automation */}
              <Card className="border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/50">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-cyan-800 dark:text-cyan-200">Автоматизация</CardTitle>
                  <CardDescription className="text-cyan-600 dark:text-cyan-300">
                    Синхронизация и скрипты
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Terminal className="h-4 w-4 text-cyan-500" />
                    <span>scripts/sync-content.js</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Terminal className="h-4 w-4 text-cyan-500" />
                    <span>npm run dev</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Terminal className="h-4 w-4 text-cyan-500" />
                    <span>Hot reload</span>
                  </div>
                </CardContent>
              </Card>
            </div>


          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 text-sm font-medium">
              <Star className="h-4 w-4" />
              Возможности
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Всё для современного контент-менеджмента
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Мощные инструменты для создания, редактирования и управления контентом. Продвинутая система тегов и категорий, улучшенный markdown редактор с качественным preview в версии 0.4.1
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Enhanced Feature Cards */}
            <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Теги и Категории</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Мульти-выбор тегов, удобные категории с динамическим управлением. Фильтрация по множественным критериям для точного поиска контента.
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Мульти-теги</Badge>
                  <Badge variant="secondary" className="text-xs">Категории</Badge>
                  <Badge variant="secondary" className="text-xs">Фильтры</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Молниеносная скорость</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Оптимизированный backend на Fastify и frontend на Next.js 15 с Turbopack обеспечивают максимальную производительность.
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>До 10x быстрее</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Edit3 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">3 Типа редакторов</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Markdown для простоты, TipTap WYSIWYG для богатого контента, блочный редактор для структурированного контента.
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Markdown</Badge>
                  <Badge variant="secondary" className="text-xs">WYSIWYG</Badge>
                  <Badge variant="secondary" className="text-xs">Blocks</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">MDX & React компоненты</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Создавайте интерактивный контент, объединяя Markdown с мощными React компонентами для уникального UX.
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Lightbulb className="h-4 w-4" />
                  <span>Безграничные возможности</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Полная типобезопасность</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed mb-4">
                  TypeScript на всех уровнях: от базы данных до интерфейса пользователя. Меньше ошибок, больше уверенности.
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Target className="h-4 w-4" />
                  <span>100% TypeScript</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Современный дизайн</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Элегантный интерфейс на основе shadcn/ui и Tailwind CSS с поддержкой тёмной темы и адаптивностью.
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Heart className="h-4 w-4" />
                  <span>Приятно пользоваться</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all hover:shadow-xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative">
                <div className="h-14 w-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Простота и мощь</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed mb-4">
                  Интуитивная админ-панель с drag & drop, предпросмотром в реальном времени и мобильной адаптацией.
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Coffee className="h-4 w-4" />
                  <span>Легко освоить</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Posts Section - Enhanced */}
      {latestPosts.length > 0 && (
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                Свежий контент
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Последние публикации
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Узнайте больше о возможностях PXLR CMS и следите за новыми функциями
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {latestPosts.map((post) => (
                <Card key={post.slug} className="group border-2 hover:border-primary/20 transition-all hover:shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="space-y-4 relative">
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('ru-RU')}
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                      )}
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 relative">
                    <CardDescription className="text-base leading-relaxed line-clamp-3">
                      {post.description}
                    </CardDescription>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button asChild variant="ghost" className="p-0 h-auto justify-start group/btn">
                      <Link href={`/posts/${post.slug}`} className="flex items-center gap-2">
                        Читать далее
                        <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/posts">
                  Все публикации
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Open Source Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 rounded-full px-4 py-2 text-sm font-medium">
                <Github className="h-4 w-4" />
                Open Source
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Открытый исходный код
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                PXLR CMS — это open source проект. Версия 0.4.1 включает улучшенный markdown редактор, качественный preview и мульти-теги с категориями. Изучайте код, вносите изменения и адаптируйте под свои нужды
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  MIT License
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Свободно используйте, изменяйте и распространяйте для любых целей
                </p>
              </div>

              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Сообщество
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Присоединяйтесь к разработке и помогайте улучшать CMS
                </p>
              </div>

              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
                <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Документация
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Подробные руководства по установке и кастомизации
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                Готовы начать своё путешествие?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Присоединяйтесь к революции в области управления контентом уже сегодня
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" variant="secondary">
                <a href={getAdminUrl()} target="_blank" rel="noopener noreferrer">
                  <Rocket className="mr-2 h-4 w-4" />
                  Начать сейчас
                </a>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-white/30 text-slate-800 bg-white/90 hover:bg-white hover:border-white/70">
                <Link href="/posts">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Изучить больше
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Безопасно</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Быстро</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>С любовью</span>
              </div>
            </div>
            
            <div className="pt-6 text-center text-sm text-white/60">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span>Сделано в </span>
                <a 
                  href="http://fubon.ru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors underline decoration-white/40 hover:decoration-white/80"
                >
                  Fubon
                </a>
                <span className="text-white/40">•</span>
                <a 
                  href="https://github.com/thefubon/pxlr-cms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-1"
                  title="GitHub репозиторий"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
