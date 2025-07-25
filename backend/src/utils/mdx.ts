import * as fs from 'fs-extra';
import * as path from 'path';
import matter from 'gray-matter';
import { Post, PostMetadata, CreatePostFromFormRequest } from '@/types/post';

export const CONTENT_DIR = path.join(process.cwd(), 'content');

// Убеждаемся, что папка content существует
export async function ensureContentDir(): Promise<void> {
  await fs.ensureDir(CONTENT_DIR);
}

// Получить все посты
export async function getAllPosts(): Promise<Post[]> {
  await ensureContentDir();
  
  const files = await fs.readdir(CONTENT_DIR);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));
  
  const posts: Post[] = [];
  
  for (const file of mdxFiles) {
    const slug = path.basename(file, '.mdx');
    const post = await getPostBySlug(slug);
    if (post) {
      posts.push(post);
    }
  }
  
  // Сортируем по дате (новые сначала)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date || '').getTime();
    const dateB = new Date(b.date || '').getTime();
    return dateB - dateA;
  });
}

// Получить пост по slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content,
      date: data.date || new Date().toISOString(),
      author: data.author,
      tags: data.tags || [],
      category: data.category,
      draft: data.draft || false,
      editorType: data.editorType as 'markdown' | 'tiptap' | 'blocks' || 'markdown',
      coverImage: data.coverImage,
    };
  } catch (error) {
    return null;
  }
}

// Создать новый пост
export async function createPost(slug: string, content: string): Promise<Post> {
  await ensureContentDir();
  
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  
  // Проверяем, что файл не существует
  const exists = await fs.pathExists(filePath);
  if (exists) {
    throw new Error(`Post with slug "${slug}" already exists`);
  }
  
  await fs.writeFile(filePath, content, 'utf-8');
  
  const post = await getPostBySlug(slug);
  if (!post) {
    throw new Error('Failed to create post');
  }
  
  return post;
}

// Обновить пост
export async function updatePost(slug: string, content: string): Promise<Post> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  
  // Проверяем, что файл существует
  const exists = await fs.pathExists(filePath);
  if (!exists) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  
  await fs.writeFile(filePath, content, 'utf-8');
  
  const post = await getPostBySlug(slug);
  if (!post) {
    throw new Error('Failed to update post');
  }
  
  return post;
}

// Удалить пост
export async function deletePost(slug: string): Promise<boolean> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    await fs.remove(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

// Генерировать контент для нового поста
export function generatePostContent(metadata: PostMetadata, content: string): string {
  const frontmatter = matter.stringify('', metadata);
  return `${frontmatter.trim()}\n\n${content}`;
}

// Создать новый пост из данных формы
export async function createPostFromForm(data: CreatePostFromFormRequest): Promise<Post> {
  await ensureContentDir();
  
  const filePath = path.join(CONTENT_DIR, `${data.slug}.mdx`);
  
  // Проверяем, что файл не существует
  const exists = await fs.pathExists(filePath);
  if (exists) {
    throw new Error(`Post with slug "${data.slug}" already exists`);
  }
  
  // Создаем метаданные для frontmatter
  const metadata: PostMetadata = {
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author,
    tags: data.tags || [],
    category: data.category,
    draft: data.draft || false,
    editorType: data.editorType || 'markdown',
    coverImage: data.coverImage,
  };
  
  // Генерируем контент с frontmatter
  const postContent = generatePostContent(metadata, data.content);
  
  // Записываем файл
  await fs.writeFile(filePath, postContent, 'utf-8');
  
  // Возвращаем созданный пост
  const post = await getPostBySlug(data.slug);
  if (!post) {
    throw new Error('Failed to create post');
  }
  
  return post;
} 