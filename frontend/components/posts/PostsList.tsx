import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatCount } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PostsPagination } from './PostsPagination';
import { PostsResponse } from '@/lib/mdx';
import { Calendar, User, Tag, Folder } from 'lucide-react';

interface PostsListProps {
  postsData: PostsResponse;
}

export function PostsList({ postsData }: PostsListProps) {
  const { posts, totalPages, currentPage } = postsData;

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Постов не найдено</h3>
        <p className="text-muted-foreground">
          Попробуйте изменить фильтры или создайте новый пост в админ-панели.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Posts Grid */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.slug} className="hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Cover Image */}
              {post.coverImage && (
                <div className="md:w-80 md:shrink-0">
                  <div className="relative w-full h-48 md:h-full">
                    <Image
                      src={post.coverImage.startsWith('/uploads/')
                        ? post.coverImage
                        : post.coverImage}
                      alt={post.title}
                      width={480}
                      height={360}
                      className="w-full h-full object-cover md:rounded-l-lg rounded-t-lg md:rounded-tr-none"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-2">
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      
                      <CardDescription className="text-base leading-relaxed">
                        {post.description}
                      </CardDescription>
                    </div>
                  </div>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                
                {post.author && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </>
                )}

                {post.category && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <Folder className="h-4 w-4" />
                      <Link 
                        href={`/posts?category=${encodeURIComponent(post.category)}`}
                        className="hover:text-primary capitalize"
                      >
                        {post.category}
                      </Link>
                    </div>
                  </>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <span>{formatCount(post.tags.length, ['тег', 'тега', 'тегов'])}</span>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
            
            {(post.category || (post.tags && post.tags.length > 0)) && (
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {post.category && (
                    <Badge 
                      variant="default"
                      className="text-xs capitalize"
                    >
                      <Link 
                        href={`/posts?category=${encodeURIComponent(post.category)}`}
                        className="hover:text-primary-foreground flex items-center gap-1"
                      >
                        <Folder className="h-3 w-3" />
                        {post.category}
                      </Link>
                    </Badge>
                  )}
                  
                  {post.tags && post.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="text-xs"
                    >
                      <Link 
                        href={`/posts?tag=${encodeURIComponent(tag)}`}
                        className="hover:text-primary"
                      >
                        {tag}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
                </div>
              </div>
            </Card>
          ))}
        </div>

      {/* Pagination */}
      <PostsPagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
} 