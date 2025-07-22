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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { postFormInputSchema, PostFormInput } from '@/lib/validations';
import { generateSlug } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { BlockEditor } from './BlockEditor';
import { TiptapEditor } from './TiptapEditor';
import { MarkdownEditor } from './MarkdownEditor';
import { RefreshCw, Package, Edit3, FileText, Maximize2, X } from 'lucide-react';
import { toast } from 'sonner';

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
  const [editorType, setEditorType] = useState<'markdown' | 'tiptap' | 'blocks'>('markdown');
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [pendingEditorType, setPendingEditorType] = useState<'markdown' | 'tiptap' | 'blocks'>('markdown');
  const [isContentFullscreen, setIsContentFullscreen] = useState(false);

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

  // Функции переключения редакторов
  const handleEditorSwitch = (newType: 'markdown' | 'tiptap' | 'blocks') => {
    if (newType === editorType) return;
    
    const currentContent = form.getValues('content');
    if (currentContent && currentContent.trim() !== '') {
      setPendingEditorType(newType);
      setShowSwitchDialog(true);
    } else {
      setEditorType(newType);
      const editorName = newType === 'markdown' ? 'Markdown' : newType === 'tiptap' ? 'TipTap' : 'блочный';
      toast.success(`Переключено на ${editorName}`);
    }
  };

  const confirmEditorSwitch = () => {
    setEditorType(pendingEditorType);
    form.setValue('content', ''); // Очищаем контент
    setShowSwitchDialog(false);
    const editorName = pendingEditorType === 'markdown' ? 'Markdown' : pendingEditorType === 'tiptap' ? 'TipTap' : 'блочный';
    toast.success(`Переключено на ${editorName}`);
  };

  const cancelEditorSwitch = () => {
    setShowSwitchDialog(false);
    setPendingEditorType(editorType);
  };

  // Функции управления fullscreen
  const handleContentFullscreen = () => {
    setIsContentFullscreen(!isContentFullscreen);
  };

  // Управление escape для fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContentFullscreen) {
        setIsContentFullscreen(false);
      }
    };

    if (isContentFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isContentFullscreen]);

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
          render={({ field }) => {
            if (isContentFullscreen) {
              return (
                <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
                  <div className="h-full flex flex-col">
                    {/* Заголовок fullscreen */}
                    <div className="px-4 pb-4 pt-2 border-b border-gray-200 dark:border-gray-700">
                       <div className="flex justify-between items-center mb-4">
                         <h2 className="text-base sm:text-lg font-semibold">Содержимое</h2>
                         <Button
                           type="button"
                           variant="ghost"
                           size="sm"
                           onClick={handleContentFullscreen}
                           title="Закрыть полноэкранный режим"
                         >
                           <X className="w-4 h-4" />
                         </Button>
                       </div>
                       <div className="flex gap-1 sm:gap-2">
                         <Button
                           type="button"
                           variant={editorType === 'markdown' ? 'default' : 'outline'}
                           size="sm"
                           className="sm:h-8 h-7"
                           onClick={() => handleEditorSwitch('markdown')}
                           disabled={isLoading}
                           title="Markdown редактор"
                         >
                           <FileText className="w-4 h-4 sm:mr-2" />
                           <span className="hidden sm:inline">Markdown</span>
                         </Button>
                         <Button
                           type="button"
                           variant={editorType === 'tiptap' ? 'default' : 'outline'}
                           size="sm"
                           className="sm:h-8 h-7"
                           onClick={() => handleEditorSwitch('tiptap')}
                           disabled={isLoading}
                           title="TipTap редактор"
                         >
                           <Edit3 className="w-4 h-4 sm:mr-2" />
                           <span className="hidden sm:inline">TipTap</span>
                         </Button>
                         <Button
                           type="button"
                           variant={editorType === 'blocks' ? 'default' : 'outline'}
                           size="sm"
                           className="sm:h-8 h-7"
                           onClick={() => handleEditorSwitch('blocks')}
                           disabled={isLoading}
                           title="Блочный редактор"
                         >
                           <Package className="w-4 h-4 sm:mr-2" />
                           <span className="hidden sm:inline">Blocks</span>
                         </Button>
                       </div>
                     </div>
                    
                     {/* Контент редактора в fullscreen */}
                     <div className="flex-1 overflow-auto">
                       <FormControl>
                         {editorType === 'markdown' ? (
                           <MarkdownEditor
                             value={field.value}
                             onChange={field.onChange}
                             disabled={isLoading}
                             placeholder="Начните писать ваш Markdown пост..."
                           />
                         ) : editorType === 'tiptap' ? (
                           <TiptapEditor
                             value={field.value}
                             onChange={field.onChange}
                             disabled={isLoading}
                             placeholder="Начните писать ваш пост..."
                           />
                         ) : (
                           <BlockEditor
                             value={field.value}
                             onChange={field.onChange}
                             disabled={isLoading}
                           />
                         )}
                       </FormControl>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <FormItem>
                <FormLabel className="mb-3 sm:mb-4 block text-base sm:text-sm font-medium">Содержимое</FormLabel>
                <div className="flex items-center justify-between pb-6 sm:pb-8">
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      type="button"
                      variant={editorType === 'markdown' ? 'default' : 'outline'}
                      size="sm"
                      className="sm:h-8 h-7"
                      onClick={() => handleEditorSwitch('markdown')}
                      disabled={isLoading}
                      title="Markdown редактор"
                    >
                      <FileText className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Markdown</span>
                    </Button>
                    <Button
                      type="button"
                      variant={editorType === 'tiptap' ? 'default' : 'outline'}
                      size="sm"
                      className="sm:h-8 h-7"
                      onClick={() => handleEditorSwitch('tiptap')}
                      disabled={isLoading}
                      title="TipTap редактор"
                    >
                      <Edit3 className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">TipTap</span>
                    </Button>
                    <Button
                      type="button"
                      variant={editorType === 'blocks' ? 'default' : 'outline'}
                      size="sm"
                      className="sm:h-8 h-7"
                      onClick={() => handleEditorSwitch('blocks')}
                      disabled={isLoading}
                      title="Блочный редактор"
                    >
                      <Package className="w-4 h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Блоки</span>
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="sm:h-8 h-7"
                    onClick={handleContentFullscreen}
                    disabled={isLoading}
                    title="Развернуть на полный экран"
                  >
                    <Maximize2 className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Развернуть</span>
                  </Button>
                </div>
                <FormControl>
                  {editorType === 'markdown' ? (
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                      placeholder="Начните писать ваш Markdown пост..."
                    />
                  ) : editorType === 'tiptap' ? (
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                      placeholder="Начните писать ваш пост..."
                    />
                  ) : (
                    <BlockEditor
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  )}
                </FormControl>
                <FormDescription>
                  {editorType === 'markdown' 
                    ? 'Классический Markdown редактор с предварительным просмотром и панелью инструментов.'
                    : editorType === 'tiptap'
                    ? 'TipTap WYSIWYG редактор с богатыми возможностями форматирования.'
                    : 'Блочный редактор с компонентами. Поддерживается Markdown форматирование.'
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
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

      {/* Диалог предупреждения о переключении редакторов */}
      <AlertDialog open={showSwitchDialog} onOpenChange={setShowSwitchDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Переключение редактора</AlertDialogTitle>
            <AlertDialogDescription>
              При переключении на другой редактор весь текущий контент будет удален. 
              Это необходимо для предотвращения конфликтов между разными технологиями 
              редактирования. Вы уверены, что хотите продолжить?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelEditorSwitch}>
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmEditorSwitch}>
              Да, переключить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
} 