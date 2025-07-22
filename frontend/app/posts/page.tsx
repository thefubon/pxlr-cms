import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PostsList } from '@/components/posts/PostsList';
import { PostsFilter } from '@/components/posts/PostsFilter';
import { getPosts, getAllTags } from '@/lib/mdx';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    tag?: string;
  }>;
}

// Генерируем динамические метаданные для страницы постов
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const selectedTag = resolvedSearchParams.tag;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);

  if (selectedTag) {
    const postsData = await getPosts({ tag: selectedTag, page: currentPage });
    return {
      title: `Посты с тегом "${selectedTag}" — Страница ${currentPage}`,
      description: `Найдено ${postsData.totalCount} постов с тегом "${selectedTag}". Читайте статьи и материалы по теме ${selectedTag}.`,
      openGraph: {
        title: `Посты с тегом "${selectedTag}"`,
        description: `Найдено ${postsData.totalCount} постов с тегом "${selectedTag}".`,
        type: 'website',
      },
    };
  }

  const postsData = await getPosts({ page: currentPage });
  const pageTitle = currentPage > 1 ? `Все посты — Страница ${currentPage}` : 'Все посты';
  
  return {
    title: pageTitle,
    description: `Читайте наши статьи и материалы. Всего опубликовано ${postsData.totalCount} постов. Найдите интересные темы и полезную информацию.`,
    openGraph: {
      title: pageTitle,
      description: `Читайте наши статьи и материалы. Всего опубликовано ${postsData.totalCount} постов.`,
      type: 'website',
    },
  };
}

export default async function PostsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  const selectedTag = resolvedSearchParams.tag;

  const postsData = await getPosts({
    page: currentPage,
    tag: selectedTag,
  });

  const allTags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Все посты</h1>
        <p className="text-muted-foreground text-lg">
          {selectedTag 
            ? `Посты с тегом "${selectedTag}" (${postsData.totalCount})`
            : `Всего постов: ${postsData.totalCount}`
          }
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar with Tags */}
        <aside className="lg:col-span-1">
          <Suspense fallback={<div>Загрузка фильтров...</div>}>
            <PostsFilter 
              tags={allTags} 
              selectedTag={selectedTag}
              totalPosts={postsData.totalCount}
            />
          </Suspense>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <Suspense fallback={<div>Загрузка постов...</div>}>
            <PostsList postsData={postsData} />
          </Suspense>
        </main>
      </div>
    </div>
  );
} 