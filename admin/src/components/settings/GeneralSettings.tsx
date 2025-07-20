import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSettings, useUpdateSettings, useClearCache } from '@/hooks/useSettings';
import { toast } from 'sonner';
import { Loader2, Globe, FileText, RotateCcw } from 'lucide-react';

const generalSettingsSchema = z.object({
  siteTitle: z.string()
    .min(1, 'Название сайта обязательно')
    .max(200, 'Название сайта должно быть не более 200 символов'),
  siteDescription: z.string()
    .min(1, 'Описание сайта обязательно')
    .max(500, 'Описание сайта должно быть не более 500 символов'),
});

type GeneralSettingsForm = z.infer<typeof generalSettingsSchema>;

export function GeneralSettings() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const clearCache = useClearCache();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<GeneralSettingsForm>({
    resolver: zodResolver(generalSettingsSchema),
    values: settings?.general || {
      siteTitle: '',
      siteDescription: '',
    },
  });

  const onSubmit = async (data: GeneralSettingsForm) => {
    if (!settings) return;

    try {
      const updatedSettings = {
        ...settings,
        general: data,
      };

      await updateSettings.mutateAsync(updatedSettings);
      
      // Автоматически очищаем кэш после сохранения
      try {
        await clearCache.mutateAsync();
        toast.success('Настройки сохранены и кэш обновлен');
      } catch (cacheError) {
        toast.success('Настройки сохранены (кэш обновится через 2 минуты)');
      }
      
      reset(data);
    } catch (error) {
      toast.error('Не удалось сохранить настройки');
      console.error('Settings update error:', error);
    }
  };

  const handleClearCache = async () => {
    try {
      await clearCache.mutateAsync();
      toast.success('Кэш очищен! Изменения применены мгновенно');
    } catch (error) {
      toast.error('Не удалось очистить кэш');
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

  return (
    <div className="space-y-6">
      {/* SEO настройки */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            SEO и мета-теги
          </CardTitle>
          <CardDescription>
            Настройки заголовка и описания сайта для поисковых систем
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteTitle">Название сайта</Label>
              <Input
                id="siteTitle"
                placeholder="Введите название вашего сайта"
                {...register('siteTitle')}
                className={errors.siteTitle ? 'border-red-500' : ''}
              />
              {errors.siteTitle && (
                <p className="text-sm text-red-500">{errors.siteTitle.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Отображается в заголовке браузера и в результатах поиска
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">Описание сайта</Label>
              <Textarea
                id="siteDescription"
                placeholder="Введите описание вашего сайта"
                rows={3}
                {...register('siteDescription')}
                className={errors.siteDescription ? 'border-red-500' : ''}
              />
              {errors.siteDescription && (
                <p className="text-sm text-red-500">{errors.siteDescription.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Краткое описание для поисковых систем и социальных сетей (рекомендуется 150-160 символов)
              </p>
            </div>

            <div className="pt-4 flex gap-3">
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
              
              <Button 
                type="button"
                variant="outline"
                onClick={handleClearCache}
                disabled={clearCache.isPending}
                className="w-full sm:w-auto"
              >
                {clearCache.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Очистка...
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Применить сейчас
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Предпросмотр */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Предпросмотр
          </CardTitle>
          <CardDescription>
            Как ваш сайт будет выглядеть в поисковых результатах
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
              {settings?.general.siteTitle || 'Название сайта'}
            </h3>
            <p className="text-green-700 text-sm mb-1">
              https://yoursite.com
            </p>
            <p className="text-gray-600 text-sm">
              {settings?.general.siteDescription || 'Описание сайта будет отображаться здесь'}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            * Это приблизительный вид результата в Google. Реальное отображение может отличаться.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 