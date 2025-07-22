import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { postFormInputSchema, PostFormInput } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';
import { useEffect } from 'react';
import { BlockEditor } from './BlockEditor';
import { RefreshCw } from 'lucide-react';

interface PostFormProps {
  defaultValues?: Partial<PostFormInput>;
  onSubmit: (data: PostFormInput) => void;
  onClose?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function PostForm({ 
  defaultValues, 
  onSubmit, 
  onClose,
  isLoading = false,
  submitLabel = "Создать пост" 
}: PostFormProps) {
  const form = useForm<PostFormInput>({
    resolver: zodResolver(postFormInputSchema),
    defaultValues: {
      title: '',
      description: '',
      slug: '',
      content: '',
      author: '',
      tags: [],
      draft: false,
      ...defaultValues,
    },
  });

  const watchTitle = form.watch('title');

  // Автогенерация slug из заголовка
  useEffect(() => {
    if (watchTitle && !form.getValues('slug')) {
      const slug = generateSlug(watchTitle);
      form.setValue('slug', slug);
    }
  }, [watchTitle, form]);

  // Функция для ручной генерации slug
  const handleGenerateSlug = () => {
    const currentTitle = form.getValues('title');
    if (currentTitle) {
      const slug = generateSlug(currentTitle);
      form.setValue('slug', slug);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Заголовок */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок</FormLabel>
                <FormControl>
                  <Input placeholder="Введите заголовок поста" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="post-slug" {...field} className="flex-1" />
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={handleGenerateSlug}
                      className="shrink-0"
                      title="Сгенерировать URL из заголовка"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Сгенерировать URL
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  URL-дружественный идентификатор поста
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Описание */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Краткое описание поста"
                  className="resize-none"
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          {/* Автор */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Автор</FormLabel>
                <FormControl>
                  <Input placeholder="Имя автора" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Теги */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Теги</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="тег1, тег2, тег3"
                    value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(',')
                        .map(tag => tag.trim())
                        .filter(Boolean);
                      field.onChange(tags);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Разделяйте теги запятыми
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Содержимое */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Содержимое</FormLabel>
              <FormControl>
                <BlockEditor
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Поддерживается Markdown форматирование
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Черновик */}
        <FormField
          control={form.control}
          name="draft"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Черновик</FormLabel>
                <FormDescription>
                  Сохранить как черновик (не публиковать)
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Сохранение..." : submitLabel}
          </Button>
          
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          )}
          
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Сбросить
          </Button>
        </div>
      </form>
    </Form>
  );
} 