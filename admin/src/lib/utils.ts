import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Удаляем специальные символы
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .trim();
}

export function generateMDXContent(
  title: string,
  description: string,
  content: string,
  options?: {
    author?: string;
    tags?: string[];
    draft?: boolean;
  }
): string {
  const frontmatter = [
    '---',
    `title: "${title}"`,
    `description: "${description}"`,
    `date: "${new Date().toISOString()}"`,
  ];

  if (options?.author) {
    frontmatter.push(`author: "${options.author}"`);
  }

  if (options?.tags && options.tags.length > 0) {
    frontmatter.push(`tags: [${options.tags.map(tag => `"${tag}"`).join(', ')}]`);
  }

  frontmatter.push(`draft: ${options?.draft || false}`);
  frontmatter.push('---');

  return `${frontmatter.join('\n')}\n\n${content}`;
}

export function parseMDXContent(post: any): { content: string } {
  // Если у поста есть отдельное поле content, используем его
  if (post.content && typeof post.content === 'string') {
    return { content: post.content };
  }
  
  // Иначе возвращаем пустое содержимое
  return { content: '' };
} 