import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Путь к папке с контентом
const contentDirectory = path.join(process.cwd(), 'src/content');
const pagesDirectory = path.join(contentDirectory, 'pages');
const postsDirectory = path.join(contentDirectory, 'posts');

export interface PageData {
  slug: string;
  title: string;
  description?: string;
  content: string;
  isHomePage?: boolean;
  date?: string;
  [key: string]: unknown;
}

export interface PostData {
  slug: string;
  title: string;
  description?: string;
  content: string;
  date?: string;
  author?: string;
  [key: string]: unknown;
}

export interface MenuItem {
  id: string;
  name: string;
  url: string;
  order: number;
}

// Получить все страницы (исключая home - она статическая)
export function getAllPages(): PageData[] {
  try {
    if (!fs.existsSync(pagesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(pagesDirectory);
    const allPages = fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const slug = name.replace(/\.mdx$/, '');
        return getPageData(slug);
      })
      .filter((page): page is PageData => page !== null)
      .filter((page) => page.slug !== 'home'); // Исключаем home

    return allPages.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  } catch (error) {
    console.error('Error reading pages:', error);
    return [];
  }
}

// Получить данные конкретной страницы
export function getPageData(slug: string): PageData | null {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Без названия',
      description: data.description || '',
      content,
      isHomePage: data.isHomePage || false,
      date: data.date || '',
      ...data
    };
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error);
    return null;
  }
}



// Получить все слаги страниц (исключая home - она статическая)
export function getAllPageSlugs(): string[] {
  try {
    if (!fs.existsSync(pagesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(pagesDirectory);
    return fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''))
      .filter((slug) => slug !== 'home'); // Исключаем home
  } catch (error) {
    console.error('Error reading page slugs:', error);
    return [];
  }
}

// Получить все посты
export function getAllPosts(): PostData[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => {
        const slug = name.replace(/\.mdx$/, '');
        return getPostData(slug);
      })
      .filter((post): post is PostData => post !== null);

    return allPosts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.title.localeCompare(a.title);
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

// Получить данные конкретного поста
export function getPostData(slug: string): PostData | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Без названия',
      description: data.description || '',
      content,
      date: data.date || '',
      author: data.author || '',
      ...data
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Получить все слаги постов
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
} 

// Получить навигационное меню
export function getNavigationMenu(): MenuItem[] {
  const staticMenu: MenuItem[] = [
    { id: 'home', name: 'Главная', url: '/', order: 1 },
    { id: 'posts', name: 'Посты', url: '/posts', order: 2 },
    { id: 'about', name: 'О проекте', url: '/about', order: 3 }
  ];

  return staticMenu;
} 