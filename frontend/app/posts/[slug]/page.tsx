import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getRelatedPosts, getAllPosts, getAllCategories, getAllTags } from '@/lib/mdx';
import { formatDate, formatCount } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User, Tag, Folder } from 'lucide-react';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { PostSidebar } from '@/components/posts/PostSidebar';
import { PostTOC } from '@/components/posts/PostTOC';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Генерируем статические пути для всех постов при сборке
export function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts
    .filter(post => !post.draft) // Только опубликованные посты
    .map(post => ({
      slug: post.slug,
    }));
}

// Генерируем динамические метаданные для каждого поста
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post || post.draft) {
    return {
      title: 'Пост не найден',
      description: 'Запрашиваемый пост не существует или недоступен.',
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post || post.draft) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(resolvedParams.slug, 3);
  const allCategories = getAllCategories();
  const allTags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к постам
          </Link>
        </Button>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Left Sidebar - Author and Categories/Tags */}
        <aside className="lg:col-span-3">
          <div className="sticky top-6">
            <PostSidebar 
              post={post} 
              allCategories={allCategories}
              allTags={allTags}
            />
          </div>
        </aside>

        {/* Main Content */}
        <article className="lg:col-span-6">
          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>

              {post.author && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </>
              )}

              {post.category && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>{formatCount(post.tags.length, ['тег', 'тега', 'тегов'])}</span>
                  </div>
                </>
              )}
            </div>

            {/* Category and Tags */}
            {(post.category || (post.tags && post.tags.length > 0)) && (
              <div className="flex flex-wrap gap-2">
                {post.category && (
                  <Badge variant="default" className="capitalize">
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
                  <Badge key={tag} variant="secondary">
                    <Link 
                      href={`/posts?tag=${encodeURIComponent(tag)}`}
                      className="hover:text-primary"
                    >
                      {tag}
                    </Link>
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <Separator className="mb-8" />

          {/* Post Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert
                         prose-p:mb-6 prose-p:mt-0 prose-p:text-foreground prose-p:leading-relaxed
                         prose-h1:mb-6 prose-h1:mt-6 prose-h1:text-foreground prose-h1:tracking-tight prose-h1:text-4xl prose-h1:font-bold
                         prose-h2:mb-6 prose-h2:mt-5 prose-h2:text-foreground prose-h2:tracking-tight prose-h2:text-3xl prose-h2:font-semibold
                         prose-h3:mb-6 prose-h3:mt-4 prose-h3:text-foreground prose-h3:tracking-tight prose-h3:text-2xl prose-h3:font-semibold
                         prose-ul:mb-6 prose-ul:mt-2 prose-ul:text-foreground
                         prose-ol:mb-6 prose-ol:mt-2 prose-ol:text-foreground
                         prose-li:mb-1 prose-li:mt-0 prose-li:text-foreground prose-li:leading-relaxed
                         prose-blockquote:mb-6 prose-blockquote:mt-3 prose-blockquote:text-foreground prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic
                         prose-pre:mb-6 prose-pre:mt-3 prose-pre:bg-slate-50 prose-pre:text-slate-900 prose-pre:border prose-pre:rounded-lg prose-pre:p-3
                         prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                         dark:prose-code:bg-slate-800 dark:prose-code:text-slate-100
                         dark:prose-pre:bg-slate-900 dark:prose-pre:text-slate-100
                         prose-strong:text-foreground prose-strong:font-semibold
                         prose-em:text-foreground
                         prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <BlockRenderer content={post.content} />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <Separator className="mb-8" />
              
              <h2 className="text-2xl font-bold mb-6">Похожие посты</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <Link 
                          href={`/posts/${relatedPost.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.description}
                      </CardDescription>
                    </CardHeader>
                    
                    {(relatedPost.category || (relatedPost.tags && relatedPost.tags.length > 0)) && (
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1">
                          {relatedPost.category && (
                            <Badge variant="default" className="text-xs capitalize">
                              <Link 
                                href={`/posts?category=${encodeURIComponent(relatedPost.category)}`}
                                className="hover:text-primary-foreground flex items-center gap-1"
                              >
                                <Folder className="h-3 w-3" />
                                {relatedPost.category}
                              </Link>
                            </Badge>
                          )}
                          
                          {relatedPost.tags && relatedPost.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {relatedPost.tags && relatedPost.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{relatedPost.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Right Sidebar - TOC */}
        <aside className="lg:col-span-3">
          <div className="sticky top-6">
            <PostTOC content={post.content} />
          </div>
        </aside>
      </div>
    </div>
  );
} 