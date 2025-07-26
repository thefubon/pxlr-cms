import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Склонение слов в русском языке
 * @param count - количество
 * @param forms - массив форм [1, 2-4, 5+]
 * @returns правильная форма слова
 */
export function pluralize(count: number, forms: [string, string, string]): string {
  const absCount = Math.abs(count)
  const lastDigit = absCount % 10
  const lastTwoDigits = absCount % 100

  // 11-14 - особый случай, всегда используем третью форму
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return forms[2]
  }

  // 1, 21, 31, 41... - первая форма (единственное число)
  if (lastDigit === 1) {
    return forms[0]
  }

  // 2, 3, 4, 22, 23, 24... - вторая форма
  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]
  }

  // 0, 5-20, 25-30... - третья форма
  return forms[2]
}

/**
 * Форматирование количества с правильным склонением
 */
export function formatCount(count: number, forms: [string, string, string]): string {
  return `${count} ${pluralize(count, forms)}`
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
  // Карта транслитерации русских символов
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  return title
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] || char) // Транслитерируем русские символы
    .join('')
    .replace(/[^\w\s-]/g, '') // Удаляем специальные символы
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .replace(/^-+|-+$/g, '') // Убираем дефисы в начале и конце
    .trim();
}

export function generateMDXContent(
  title: string,
  description: string,
  content: string,
  options?: {
    date?: string;
    author?: string;
    tags?: string[];
    category?: string;
    draft?: boolean;
    editorType?: 'markdown' | 'tiptap' | 'blocks';
    coverImage?: string;
  }
): string {
  const frontmatter = [
    '---',
    `title: "${title}"`,
    `description: "${description}"`,
    `date: "${options?.date || new Date().toISOString()}"`,
  ];

  if (options?.author) {
    frontmatter.push(`author: "${options.author}"`);
  }

  if (options?.tags && options.tags.length > 0) {
    frontmatter.push(`tags: [${options.tags.map(tag => `"${tag}"`).join(', ')}]`);
  }

  if (options?.category) {
    frontmatter.push(`category: "${options.category}"`);
  }

  if (options?.coverImage) {
    frontmatter.push(`coverImage: "${options.coverImage}"`);
  }

  frontmatter.push(`draft: ${options?.draft || false}`);
  
  if (options?.editorType) {
    frontmatter.push(`editorType: "${options.editorType}"`);
  }
  
  frontmatter.push('---');

  return `${frontmatter.join('\n')}\n\n${content}`;
}

export function parseMDXContent(post: any): { content: string; editorType?: 'markdown' | 'tiptap' | 'blocks' } {
  // Если у поста есть отдельное поле content, используем его
  if (post.content && typeof post.content === 'string') {
    return { 
      content: post.content,
      editorType: post.editorType || 'markdown'
    };
  }
  
  // Иначе возвращаем пустое содержимое с типом по умолчанию
  return { 
    content: '',
    editorType: 'markdown'
  };
} 

// Функция для получения правильного backend URL
export const getBackendUrl = () => {
  if (import.meta.env.PROD) {
    // В продакшене используем относительный URL
    return window.location.origin.replace(':5174', ':3333').replace(':5173', ':3333');
  }
  return 'http://localhost:3333';
};

// Функция для получения правильного API URL
export const getApiUrl = () => {
  return `${getBackendUrl()}/api`;
};

// Функция для получения правильного frontend URL
export const getFrontendUrl = () => {
  if (import.meta.env.PROD) {
    // В продакшене используем относительный URL
    return window.location.origin.replace(':5174', ':3000').replace(':5173', ':3000');
  }
  // В разработке сначала пробуем 3001, потом 3000
  return 'http://localhost:3001';
};

// Функция для получения альтернативного frontend URL (для fallback)
export const getFrontendUrlFallback = () => {
  if (import.meta.env.PROD) {
    return getFrontendUrl();
  }
  return 'http://localhost:3000';
};

// Функция для формирования правильного URL изображения для превью в админке
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // Если это уже полный URL, возвращаем как есть
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Если это путь к загруженному файлу, добавляем frontend URL
  if (imagePath.startsWith('/uploads/')) {
    return `${getFrontendUrl()}${imagePath}`;
  }
  
  // Для остальных случаев возвращаем как есть
  return imagePath;
}; 