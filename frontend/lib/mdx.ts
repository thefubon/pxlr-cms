import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { getPostSettings } from './settings';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;
  html: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
}

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  postsPerPage: number;
}

/**
 * Получить все теги из всех постов
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const allTags = posts.flatMap(post => post.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
}

/**
 * Получить все категории из всех постов
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const allCategories = posts
    .map(post => post.category)
    .filter(Boolean) as string[];
  const uniqueCategories = [...new Set(allCategories)];
  return uniqueCategories.sort();
}

/**
 * Получить все посты
 */
export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn('Content directory not found:', contentDirectory);
      return [];
    }

    const filenames = fs.readdirSync(contentDirectory);
    const posts = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const slug = filename.replace(/\.mdx$/, '');
        return getPostBySlug(slug);
      })
      .filter(Boolean) as Post[];

    // Сортируем по дате (новые сначала)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

/**
 * Получить посты с пагинацией и фильтрацией
 */
export async function getPosts(options: {
  page?: number;
  perPage?: number;
  tag?: string;
  tags?: string[];
  category?: string;
}): Promise<PostsResponse> {
  const { page = 1, tag, tags, category } = options;
  
  // Получаем настройку postsPerPage из backend, если не указано явно
  let perPage = options.perPage;
  if (!perPage) {
    try {
      const postSettings = await getPostSettings();
      perPage = postSettings.postsPerPage;
    } catch (error) {
      console.warn('Failed to load post settings, using default:', error);
      perPage = 6; // дефолтное значение
    }
  }
  
  let posts = getAllPosts();

  // Фильтрация по тегам
  const selectedTags = tags || (tag ? [tag] : []);
  if (selectedTags.length > 0) {
    posts = posts.filter(post => 
      post.tags && post.tags.some(postTag => 
        selectedTags.some(selectedTag => 
          postTag.toLowerCase() === selectedTag.toLowerCase()
        )
      )
    );
  }

  // Фильтрация по категории
  if (category) {
    posts = posts.filter(post => 
      post.category && post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Фильтруем черновики (только опубликованные)
  posts = posts.filter(post => !post.draft);

  const totalCount = posts.length;
  const totalPages = Math.ceil(totalCount / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalCount,
    totalPages,
    currentPage: page,
    postsPerPage: perPage,
  };
}

/**
 * Получить пост по slug
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content,
      html: '', // Будет заполнено в компоненте
      date: data.date || new Date().toISOString(),
      author: data.author,
      tags: data.tags || [],
      category: data.category,
      draft: data.draft || false,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Конвертировать markdown в HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Получить статистику постов
 */
export function getPostsStats() {
  const posts = getAllPosts();
  const publishedPosts = posts.filter(post => !post.draft);
  const draftPosts = posts.filter(post => post.draft);
  const tags = getAllTags();

  return {
    total: posts.length,
    published: publishedPosts.length,
    drafts: draftPosts.length,
    tags: tags.length,
    uniqueTags: tags,
  };
}

/**
 * Получить связанные посты (по тегам)
 */
export function getRelatedPosts(slug: string, limit: number = 3): Post[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost || !currentPost.tags || currentPost.tags.length === 0) {
    return [];
  }

  const allPosts = getAllPosts()
    .filter(post => post.slug !== slug && !post.draft);

  // Находим посты с общими тегами
  const relatedPosts = allPosts
    .map(post => {
      const commonTags = post.tags?.filter(tag => 
        currentPost.tags?.includes(tag)
      ) || [];
      
      return {
        post,
        score: commonTags.length,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  return relatedPosts;
} 