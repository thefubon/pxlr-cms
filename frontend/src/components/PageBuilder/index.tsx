export { Accordion, SimpleAccordion } from '../Accordion';
export { Card } from './Card';
export { CallToAction } from './CallToAction';
export { FeatureGrid } from './FeatureGrid';
export { Hero } from './Hero';
export { Tabs } from './Tabs';
export { Quote } from './Quote';
export { ImageGallery } from './ImageGallery';

// Типы для компонентов
export interface ComponentTemplate {
  id: string;
  name: string;
  category: 'layout' | 'content' | 'interactive' | 'media';
  icon: string;
  description: string;
  template: string;
  previewImage?: string;
}

// Шаблоны компонентов для вставки в редактор
export const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  {
    id: 'accordion',
    name: 'Аккордион',
    category: 'interactive',
    icon: '📋',
    description: 'Раскрывающийся список вопросов и ответов',
    template: `<Accordion items={[
  {
    title: "Заголовок 1",
    content: "Содержимое первого элемента аккордиона. Можете использовать <strong>HTML</strong> теги."
  },
  {
    title: "Заголовок 2", 
    content: "Содержимое второго элемента аккордиона с <em>курсивом</em> и списками:<br/><ul><li>Пункт 1</li><li>Пункт 2</li></ul>"
  }
]} allowMultiple={false} />`
  },
  {
    id: 'card',
    name: 'Карточка',
    category: 'content',
    icon: '🃏',
    description: 'Информационная карточка с заголовком и контентом',
    template: `<Card 
  title="Заголовок карточки"
  content="Описание карточки с важной информацией для пользователей."
  link="/ссылка"
  linkText="Подробнее"
/>`
  },
  {
    id: 'cta',
    name: 'Призыв к действию',
    category: 'content',
    icon: '🎯',
    description: 'Яркий блок для привлечения внимания',
    template: `<CallToAction
  title="Заголовок призыва"
  description="Описание того, что пользователь получит при выполнении действия."
  buttonText="Действие"
  buttonLink="/ссылка"
  variant="primary"
/>`
  },
  {
    id: 'feature-grid',
    name: 'Сетка возможностей',
    category: 'layout',
    icon: '⚡',
    description: 'Сетка с основными возможностями продукта',
    template: `<FeatureGrid features={[
  {
    icon: "🚀",
    title: "Быстрый запуск",
    description: "Начните работу за несколько минут"
  },
  {
    icon: "🔧",
    title: "Настройка",
    description: "Гибкие возможности конфигурации"
  },
  {
    icon: "📱",
    title: "Адаптивность",
    description: "Работает на всех устройствах"
  }
]} />`
  },
  {
    id: 'hero',
    name: 'Hero секция',
    category: 'layout',
    icon: '🌟',
    description: 'Главная секция с заголовком и кнопкой',
    template: `<Hero
  title="Большой заголовок"
  subtitle="Подзаголовок с описанием продукта или услуги"
  buttonText="Начать"
  buttonLink="/start"
  backgroundImage="/images/hero-bg.jpg"
/>`
  },
  {
    id: 'tabs',
    name: 'Вкладки',
    category: 'interactive',
    icon: '📑',
    description: 'Интерактивные вкладки с контентом',
    template: `<Tabs tabs={[
  {
    label: "Вкладка 1",
    content: "Содержимое первой вкладки"
  },
  {
    label: "Вкладка 2",
    content: "Содержимое второй вкладки" 
  }
]} />`
  },
  {
    id: 'quote',
    name: 'Цитата',
    category: 'content',
    icon: '💬',
    description: 'Выделенная цитата или отзыв',
    template: `<Quote
  text="Это потрясающий продукт, который изменил наш подход к работе!"
  author="Имя автора"
  position="Должность, Компания"
  avatar="/images/avatar.jpg"
/>`
  },
  {
    id: 'gallery',
    name: 'Галерея изображений',
    category: 'media',
    icon: '🖼️',
    description: 'Сетка изображений с lightbox',
    template: `<ImageGallery images={[
  {
    src: "/images/image1.jpg",
    alt: "Описание изображения 1",
    caption: "Подпись к изображению"
  },
  {
    src: "/images/image2.jpg", 
    alt: "Описание изображения 2",
    caption: "Подпись к изображению"
  }
]} columns={3} />`
  }
];

// Группировка компонентов по категориям
export const COMPONENT_CATEGORIES = {
  layout: {
    name: 'Макет',
    icon: '📐',
    color: 'blue'
  },
  content: {
    name: 'Контент',
    icon: '📝',
    color: 'green'
  },
  interactive: {
    name: 'Интерактив',
    icon: '⚡',
    color: 'purple'
  },
  media: {
    name: 'Медиа',
    icon: '🎨',
    color: 'pink'
  }
};

// Функция для получения компонентов по категории
export function getComponentsByCategory(category: string): ComponentTemplate[] {
  return COMPONENT_TEMPLATES.filter(component => component.category === category);
}

// Функция для получения всех категорий
export function getAllCategories() {
  return Object.keys(COMPONENT_CATEGORIES);
} 