import { getPageData, getAllPageSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/MDXProvider';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  
  return slugs
    .filter(slug => slug !== 'home') // Исключаем home, так как он на главной странице
    .map((slug) => ({
      slug,
    }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = getPageData(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg prose-gray max-w-none mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{pageData.title}</h1>
        <MDXRemote 
          source={pageData.content} 
          components={mdxComponents}
        />
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pageData = getPageData(slug);

  if (!pageData) {
    return {
      title: 'Страница не найдена',
    };
  }

  return {
    title: pageData.title,
    description: pageData.description || `${pageData.title} - PXLR CMS`,
  };
} 