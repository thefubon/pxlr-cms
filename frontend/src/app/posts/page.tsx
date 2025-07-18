import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Блог</h1>
          <p className="text-xl text-gray-600">
            Последние новости и статьи о PXLR CMS
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Пока нет постов</h2>
            <p className="text-gray-600 mb-8">
              Создайте первый пост в админке, чтобы начать делиться своими идеями.
            </p>
            <a
              href="http://localhost:3333"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              🚀 Открыть админку
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200"
              >
                <header className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  {post.description && (
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
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
                
                <div className="flex justify-between items-center">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Читать далее →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const posts = getAllPosts();
  
  return {
    title: 'Блог - PXLR CMS',
    description: `Последние новости и статьи о PXLR CMS. ${posts.length} ${
      posts.length === 1 ? 'пост' : posts.length < 5 ? 'поста' : 'постов'
    } доступно для чтения.`,
    openGraph: {
      title: 'Блог - PXLR CMS',
      description: 'Последние новости и статьи о PXLR CMS',
      type: 'website',
    },
  };
} 