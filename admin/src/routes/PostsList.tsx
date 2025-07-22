import { Link } from 'react-router-dom';
import { usePosts, useDeletePost } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { FileText, Plus, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { formatDate, formatCount } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { Post } from '@/types/post';

export function PostsList() {
  const { data: postsData, isLoading } = usePosts();
  const deletePost = useDeletePost();
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const posts = postsData?.posts || [];

  const handleDeletePost = async (slug: string) => {
    try {
      await deletePost.mutateAsync(slug);
      toast.success("Пост был успешно удален");
      setPostToDelete(null);
    } catch (error) {
      toast.error("Не удалось удалить пост");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="border-b pb-5">
          <h1 className="text-3xl font-bold tracking-tight">Все посты</h1>
          <p className="text-muted-foreground">Управление всеми постами в системе</p>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Загрузка постов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Все посты</h1>
          <p className="text-muted-foreground">
            Управление всеми постами в системе ({formatCount(posts.length, ['пост', 'поста', 'постов'])})
          </p>
        </div>
        
        <Button asChild>
          <Link to="/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            Создать пост
          </Link>
        </Button>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center text-card-foreground shadow-sm">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Нет постов</h3>
          <p className="text-muted-foreground mb-6">
            Начните с создания вашего первого поста.
          </p>
          <Button asChild>
            <Link to="/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              Создать первый пост
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="divide-y">
            {posts.map((post) => (
              <div key={post.slug} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold truncate">
                        {post.title}
                      </h3>
                      {post.draft && (
                        <Badge variant="secondary">Черновик</Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Slug: {post.slug}</span>
                      <span>•</span>
                      <span>{formatDate(post.date || '')}</span>
                      {post.author && (
                        <>
                          <span>•</span>
                          <span>Автор: {post.author}</span>
                        </>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>Теги: {post.tags.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4 flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/posts/${post.slug}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                      </Link>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/posts/${post.slug}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Редактировать
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a
                            href={`http://localhost:3000/posts/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Посмотреть на сайте
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setPostToDelete(post)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить пост?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить пост "{postToDelete?.title}"? 
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => postToDelete && handleDeletePost(postToDelete.slug)}
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 