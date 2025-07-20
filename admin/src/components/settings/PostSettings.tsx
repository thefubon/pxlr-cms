import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { toast } from 'sonner';
import { Loader2, FileText, Info } from 'lucide-react';

const postSettingsSchema = z.object({
  postsPerPage: z.number()
    .min(1, 'Минимум 1 пост на странице')
    .max(50, 'Максимум 50 постов на странице'),
});

type PostSettingsForm = z.infer<typeof postSettingsSchema>;

export function PostSettings() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<PostSettingsForm>({
    resolver: zodResolver(postSettingsSchema),
    values: settings?.posts || {
      postsPerPage: 6,
    },
  });

  const currentPostsPerPage = watch('postsPerPage');

  const onSubmit = async (data: PostSettingsForm) => {
    if (!settings) return;

    try {
      const updatedSettings = {
        ...settings,
        posts: data,
      };

      await updateSettings.mutateAsync(updatedSettings);
      toast.success('Настройки постов успешно сохранены');
      reset(data);
    } catch (error) {
      toast.error('Не удалось сохранить настройки');
      console.error('Settings update error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Загрузка настроек...</span>
      </div>
    );
  }

  // Примерные значения для демонстрации
  const totalPosts = 4; // В реальности это можно получить из API
  const totalPages = Math.ceil(totalPosts / (currentPostsPerPage || 1));

  return (
    <div className="space-y-6">
      {/* Настройки пагинации */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Отображение постов
          </CardTitle>
          <CardDescription>
            Настройки количества постов на странице и пагинации
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="postsPerPage">Количество постов на странице</Label>
              <Input
                id="postsPerPage"
                type="number"
                min="1"
                max="50"
                placeholder="6"
                {...register('postsPerPage', { valueAsNumber: true })}
                className={errors.postsPerPage ? 'border-red-500' : ''}
              />
              {errors.postsPerPage && (
                <p className="text-sm text-red-500">{errors.postsPerPage.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Количество постов, отображаемых на одной странице (от 1 до 50)
              </p>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={!isDirty || updateSettings.isPending}
                className="w-full sm:w-auto"
              >
                {updateSettings.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Сохранить изменения
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Предпросмотр пагинации */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Предпросмотр пагинации
          </CardTitle>
          <CardDescription>
            Как будет выглядеть пагинация с текущими настройками
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Всего постов: <strong>{totalPosts}</strong></span>
              <span>•</span>
              <span>Постов на странице: <strong>{currentPostsPerPage || settings?.posts.postsPerPage || 6}</strong></span>
              <span>•</span>
              <span>Всего страниц: <strong>{totalPages}</strong></span>
            </div>

            {totalPages > 1 ? (
              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground mb-3">Пример пагинации:</p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm border rounded bg-white">‹ Предыдущая</button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                    <button 
                      key={i}
                      className={`px-3 py-1 text-sm border rounded ${
                        i === 0 ? 'bg-primary text-primary-foreground' : 'bg-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  {totalPages > 5 && <span className="text-muted-foreground">...</span>}
                  <button className="px-3 py-1 text-sm border rounded bg-white">Следующая ›</button>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  <Info className="h-4 w-4 inline mr-1" />
                  Пагинация не отображается, так как все посты помещаются на одной странице
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Рекомендации */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Рекомендации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>6-12 постов</strong> - оптимальное количество для большинства сайтов</p>
            <p>• <strong>Меньше постов</strong> - быстрая загрузка страницы, но больше переходов</p>
            <p>• <strong>Больше постов</strong> - меньше переходов, но медленнее загрузка</p>
            <p>• Учитывайте скорость интернета ваших пользователей</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 