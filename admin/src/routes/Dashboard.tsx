import { useQuery } from '@tanstack/react-query';
import { FileText, Plus, Activity, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { healthApi } from '@/lib/api';
import { formatDate, pluralize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePosts } from '@/hooks/usePosts';

export function Dashboard() {
  // Загружаем данные
  const { data: postsData, isLoading: postsLoading } = usePosts();

  const { data: healthData } = useQuery({
    queryKey: ['health'],
    queryFn: healthApi.checkHealth,
    refetchInterval: 30000, // каждые 30 секунд
  });

  const posts = postsData?.posts || [];
  const publishedPosts = posts.filter(post => !post.draft);
  const draftPosts = posts.filter(post => post.draft);
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-muted-foreground">
          Обзор вашей CMS системы и последних активностей
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
                              <p className="text-sm font-medium text-muted-foreground">Всего {pluralize(posts.length, ['пост', 'поста', 'постов'])}</p>
              <p className="text-2xl font-bold">
                {postsLoading ? '...' : posts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Опубликовано</p>
              <p className="text-2xl font-bold">
                {postsLoading ? '...' : publishedPosts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Черновики</p>
              <p className="text-2xl font-bold">
                {postsLoading ? '...' : draftPosts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Plus className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Создать пост</p>
              <Button asChild variant="link" className="p-0 h-auto text-purple-600">
                <Link to="/posts/new">
                  Новый пост →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Последние посты</h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/posts">
              Посмотреть все
            </Link>
          </Button>
        </div>

        <div className="divide-y">
          {postsLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              Загрузка...
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">Нет постов</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Начните с создания вашего первого поста.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/posts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Создать пост
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            recentPosts.map((post) => (
              <div key={post.slug} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {post.description}
                    </p>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <span>{formatDate(post.date || '')}</span>
                      {post.draft && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-yellow-600">Черновик</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/posts/${post.slug}/edit`}>
                        Редактировать
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Server Status */}
      {healthData && (
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Статус сервера</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm">Сервер работает</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Последняя проверка: {formatDate(healthData.timestamp)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 