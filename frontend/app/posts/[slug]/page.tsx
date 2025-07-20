import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, markdownToHtml, getRelatedPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post || post.draft) {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);
  const relatedPosts = getRelatedPosts(resolvedParams.slug, 3);

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

      <article className="max-w-4xl mx-auto">
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

            {post.tags && post.tags.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>{post.tags.length} тегов</span>
                </div>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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
        <div 
          className="prose prose-lg max-w-none
                     prose-headings:tracking-tight 
                     prose-h1:text-4xl prose-h1:font-bold
                     prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
                     prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                     prose-p:leading-relaxed prose-p:text-foreground
                     prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-foreground prose-strong:font-semibold
                     prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                     prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg
                     prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic
                     prose-ul:text-foreground prose-ol:text-foreground
                     prose-li:text-foreground prose-li:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto mt-16">
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
                
                {relatedPost.tags && relatedPost.tags.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {relatedPost.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {relatedPost.tags.length > 3 && (
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
    </div>
  );
} 