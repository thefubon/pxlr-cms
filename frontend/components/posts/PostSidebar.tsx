import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Folder, Tag, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/lib/mdx';

interface PostSidebarProps {
  post: Post;
  allCategories?: string[];
  allTags?: string[];
}

export function PostSidebar({ post, allCategories = [], allTags = [] }: PostSidebarProps) {
  return (
    <div className="space-y-6 relative top-16">
      {/* Информация об авторе */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Автор
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div>
              <p className="font-medium text-foreground">
                {post.author || 'Неизвестный автор'}
              </p>
            </div>
            <Separator />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Опубликовано {formatDate(post.date)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Категории */}
      {(post.category || allCategories.length > 0) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Категории
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {post.category && (
                <div className="mb-3">
                  <Badge
                    variant="default"
                    className="capitalize">
                    <Link
                      href={`/posts?category=${encodeURIComponent(
                        post.category
                      )}`}
                      className="hover:text-primary-foreground">
                      {post.category}
                    </Link>
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Текущая категория
                  </p>
                </div>
              )}

              {allCategories.length > 0 && (
                <>
                  {post.category && <Separator className="my-3" />}
                  <div>
                    <p className="text-sm font-medium mb-2">Все категории:</p>
                    <div className="flex flex-wrap gap-1">
                      {allCategories.map((category) => (
                        <Badge
                          key={category}
                          variant={
                            category === post.category ? 'default' : 'outline'
                          }
                          className="text-xs capitalize">
                          <Link
                            href={`/posts?category=${encodeURIComponent(
                              category
                            )}`}
                            className="hover:text-primary">
                            {category}
                          </Link>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Теги */}
      {((post.tags && post.tags.length > 0) || allTags.length > 0) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Теги
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {post.tags && post.tags.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs">
                        <Link
                          href={`/posts?tag=${encodeURIComponent(tag)}`}
                          className="hover:text-primary">
                          {tag}
                        </Link>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Теги этого поста
                  </p>
                </div>
              )}

              {allTags.length > 0 && (
                <>
                  {post.tags && post.tags.length > 0 && (
                    <Separator className="my-3" />
                  )}
                  <div>
                    <p className="text-sm font-medium mb-2">Популярные теги:</p>
                    <div className="flex flex-wrap gap-1">
                      {allTags.slice(0, 10).map((tag) => {
                        const isCurrentTag = post.tags?.includes(tag)
                        return (
                          <Badge
                            key={tag}
                            variant={isCurrentTag ? 'secondary' : 'outline'}
                            className="text-xs">
                            <Link
                              href={`/posts?tag=${encodeURIComponent(tag)}`}
                              className="hover:text-primary">
                              {tag}
                            </Link>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 