import { useParams, useNavigate, Link } from 'react-router-dom';
import { PostForm } from '@/components/forms/PostForm';
import { usePost, useUpdatePost } from '@/hooks/usePosts';
import { PostFormInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { parseMDXContent } from '@/lib/utils';

export function PostEdit() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const updatePost = useUpdatePost();
  
  const { data: post, isLoading, error } = usePost(slug!);

  const handleSubmit = async (data: PostFormInput) => {
    if (!slug) return;
    
    try {
      await updatePost.mutateAsync({ slug, data });
      
      toast.success(`Пост "${data.title}" был обновлен`);
      
      // Оставляем пользователя на той же странице после сохранения
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Не удалось обновить пост");
    }
  };

  const handleClose = () => {
    navigate('/posts');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4 border-b pb-5">
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link to="/posts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к постам
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Редактировать пост</h1>
            <p className="text-muted-foreground">Загрузка данных поста...</p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-8 text-center text-card-foreground shadow-sm">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Загрузка поста...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="space-y-6">
        <div className="space-y-4 border-b pb-5">
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link to="/posts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к постам
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Пост не найден</h1>
            <p className="text-muted-foreground">Пост с указанным slug не существует</p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-8 text-center text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Ошибка 404</h3>
          <p className="text-muted-foreground mb-6">
            Пост "{slug}" не найден в системе.
          </p>
          <Button asChild>
            <Link to="/posts">Вернуться к списку постов</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Парсим содержимое MDX для получения отдельных полей
  const parsedContent = parseMDXContent(post);
  
  const defaultValues: Partial<PostFormInput> = {
    title: post.title,
    description: post.description,
    slug: post.slug,
    content: parsedContent.content,
    author: post.author || '',
    tags: post.tags || [],
    category: post.category || '',
    draft: post.draft || false,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-4 border-b pb-5">
        <Button asChild variant="outline" size="sm" className="w-fit">
          <Link to="/posts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к постам
          </Link>
        </Button>
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Редактировать пост</h1>
            <p className="text-muted-foreground">
              Редактирование поста "{post.title}"
            </p>
          </div>
          
          <Button asChild variant="outline">
            <a
              href={`http://localhost:3000/posts/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Посмотреть на сайте
            </a>
          </Button>
        </div>
      </div>
      
      {/* Form */}
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <PostForm 
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isLoading={updatePost.isPending}
          submitLabel="Обновить пост"
        />
      </div>
    </div>
  );
} 