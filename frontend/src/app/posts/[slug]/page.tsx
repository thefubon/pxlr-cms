import { getPostData, getAllPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/MDXProvider';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            ← Вернуться к постам
          </Link>
        </div>
        
        <article className="bg-white rounded-lg shadow-sm border p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {post.description && (
              <p className="text-xl text-gray-600 mb-4">
                {post.description}
              </p>
            )}
            
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              {post.date && (
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              
              {post.author && (
                <span>
                  Автор: {post.author}
                </span>
              )}
            </div>
          </header>
          
          <div className="prose prose-lg prose-gray max-w-none">
            <MDXRemote 
              source={post.content} 
              components={mdxComponents}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return {
      title: 'Пост не найден',
    };
  }

  return {
    title: post.title,
    description: post.description || `${post.title} - PXLR CMS`,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
  };
} 