import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PostsList } from '@/components/posts/PostsList';
import { PostsFilter } from '@/components/posts/PostsFilter';
import { CategoriesFilter } from '@/components/posts/CategoriesFilter';
import { getPosts, getAllTags, getAllCategories } from '@/lib/mdx';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    tags?: string;
    category?: string;
  }>;
}

// Генерируем динамические метаданные для страницы постов
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const selectedTag = resolvedSearchParams.tag;
  const tagsParam = resolvedSearchParams.tags;
  const selectedCategory = resolvedSearchParams.category;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);

  // Обработка тегов - поддерживаем как старый формат (tag), так и новый (tags)
  let selectedTags: string[] = [];
  if (tagsParam) {
    selectedTags = tagsParam.split(',').map(tag => tag.trim()).filter(Boolean);
  } else if (selectedTag) {
    selectedTags = [selectedTag];
  }

  if (selectedCategory) {
    const postsData = await getPosts({ category: selectedCategory, page: currentPage });
    return {
      title: `Посты в категории "${selectedCategory}" — Страница ${currentPage}`,
      description: `Найдено ${postsData.totalCount} постов в категории "${selectedCategory}". Читайте статьи и материалы по этой теме.`,
      openGraph: {
        title: `Категория: ${selectedCategory}`,
        description: `Найдено ${postsData.totalCount} постов в категории "${selectedCategory}".`,
        type: 'website',
      },
    };
  }

  if (selectedTags.length > 0) {
    const postsData = await getPosts({ tags: selectedTags, page: currentPage });
    const tagsText = selectedTags.length === 1 
      ? `"${selectedTags[0]}"` 
      : selectedTags.map(tag => `"${tag}"`).join(', ');
    
    return {
      title: `Посты с тегами ${tagsText} — Страница ${currentPage}`,
      description: `Найдено ${postsData.totalCount} постов с тегами ${tagsText}. Читайте статьи и материалы по этим темам.`,
      openGraph: {
        title: `Посты с тегами ${tagsText}`,
        description: `Найдено ${postsData.totalCount} постов с тегами ${tagsText}.`,
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
  const tagsParam = resolvedSearchParams.tags;
  const selectedCategory = resolvedSearchParams.category;

  // Обработка тегов - поддерживаем как старый формат (tag), так и новый (tags)
  let selectedTags: string[] = [];
  if (tagsParam) {
    selectedTags = tagsParam.split(',').map(tag => tag.trim()).filter(Boolean);
  } else if (selectedTag) {
    selectedTags = [selectedTag];
  }

  const postsData = await getPosts({
    page: currentPage,
    tags: selectedTags,
    category: selectedCategory,
  });

  const allTags = getAllTags();
  const allCategories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Все посты</h1>
        <p className="text-muted-foreground text-lg">
          {selectedCategory
            ? `Категория: ${selectedCategory} (${postsData.totalCount})`
            : selectedTags.length > 0
            ? `Посты с тегами: ${selectedTags.join(', ')} (${
                postsData.totalCount
              })`
            : `Всего постов: ${postsData.totalCount}`}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar with Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <Suspense fallback={<div>Загрузка фильтров...</div>}>
            <CategoriesFilter
              categories={allCategories}
              selectedCategory={selectedCategory}
              totalPosts={postsData.totalCount}
            />
            <PostsFilter
              tags={allTags}
              selectedTags={selectedTags}
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
  )
} 