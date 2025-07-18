import { getApiUrl, getHomepageSource } from '../../config/env.js';

export interface HomepageData {
  title: string;
  description: string;
  content: string;
}

// Static homepage content for production
const staticHomepageContent: HomepageData = {
  title: 'PXLR CMS',
  description: 'Современная система управления контентом для Next.js',
  content: `# Добро пожаловать в PXLR CMS

PXLR CMS - это современная система управления контентом, созданная специально для Next.js приложений.

## Основные возможности

### 🚀 Быстрая разработка
- Готовая система управления контентом
- Поддержка MDX для rich-контента
- Автоматическая генерация страниц

### 📝 Удобное редактирование
- Интуитивный интерфейс админки
- Редактирование в реальном времени
- Поддержка Markdown синтаксиса

### 🎯 Современные технологии
- Построено на Next.js 15
- TypeScript поддержка
- Tailwind CSS стилизация

### 📱 Адаптивный дизайн
- Оптимизация для всех устройств
- Быстрая загрузка
- SEO-оптимизация

## Начните прямо сейчас

Создавайте контент, настраивайте дизайн и публикуйте ваши идеи с PXLR CMS.`
};

/**
 * Fetches homepage data from the API or returns static content
 */
export async function getHomepageData(): Promise<HomepageData> {
  const source = getHomepageSource();
  
  // Return static content for production or when API is not available
  if (source === 'static') {
    return staticHomepageContent;
  }

  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/homepage`, {
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      console.warn('Failed to fetch homepage from API, falling back to static content');
      return staticHomepageContent;
    }

    const data = await response.json();
    return {
      title: data.title || staticHomepageContent.title,
      description: data.description || staticHomepageContent.description,
      content: data.content || staticHomepageContent.content,
    };
  } catch (error) {
    console.warn('Error fetching homepage data:', error);
    return staticHomepageContent;
  }
}

/**
 * Saves homepage data to the API (development only)
 */
export async function saveHomepageData(data: HomepageData): Promise<boolean> {
  const source = getHomepageSource();
  
  if (source !== 'api') {
    console.warn('Homepage saving is only available in development mode');
    return false;
  }

  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/homepage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Error saving homepage data:', error);
    return false;
  }
} 