import { useNavigate } from 'react-router-dom';
import { PostForm } from '@/components/forms/PostForm';
import { useCreatePost } from '@/hooks/usePosts';
import { PostFormInput } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export function PostCreate() {
  const navigate = useNavigate();
  const createPost = useCreatePost();

  const handleSubmit = async (data: PostFormInput) => {
    try {
      await createPost.mutateAsync(data);
      
      toast.success(`Пост "${data.title}" был создан`);
      
      // После создания перенаправляем на редактирование
      navigate(`/posts/${data.slug}/edit`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Не удалось создать пост");
    }
  };

  const handleClose = () => {
    navigate('/posts');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4 border-b pb-5">
        <Button asChild variant="outline" size="sm">
          <Link to="/posts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к постам
          </Link>
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Создать новый пост</h1>
          <p className="text-muted-foreground">
            Создание нового поста для публикации
          </p>
        </div>
      </div>
      
      {/* Form */}
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <PostForm 
          onSubmit={handleSubmit}
          onClose={handleClose}
          isLoading={createPost.isPending}
          submitLabel="Создать пост"
        />
      </div>
    </div>
  );
} 