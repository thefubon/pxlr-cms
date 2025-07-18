// Remove MDXProvider import since it requires client context
import { 
  Accordion, 
  SimpleAccordion,
  Card,
  CallToAction,
  FeatureGrid,
  Hero,
  Tabs,
  Quote,
  ImageGallery
} from './PageBuilder';
import { HTMLAttributes, AnchorHTMLAttributes, ImgHTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';
import Image from 'next/image';

// Компоненты, доступные в MDX
const components = {
  // Интерактивные компоненты
  Accordion,
  SimpleAccordion,
  
  // Контентные компоненты
  Card,
  CallToAction,
  Quote,
  
  // Макетные компоненты
  FeatureGrid,
  Hero,
  
  // Интерактивные элементы
  Tabs,
  
  // Медиа компоненты
  ImageGallery,

  // Дополнительные HTML элементы с улучшенным стилем
  h1: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-8" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props}>
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a 
      href={href} 
      className="text-blue-600 hover:text-blue-700 underline" 
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, width, height, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    const imageWidth = typeof width === 'number' ? width : (typeof width === 'string' ? parseInt(width) : 800);
    const imageHeight = typeof height === 'number' ? height : (typeof height === 'string' ? parseInt(height) : 600);
    const imageSrc = typeof src === 'string' ? src : '';
    
    return (
      <Image 
        src={imageSrc} 
        alt={alt || ''}
        width={imageWidth}
        height={imageHeight}
      className="rounded-lg shadow-md my-4 max-w-full h-auto"
        style={{ width: 'auto', height: 'auto' }}
      {...props}
    />
    );
  },
  table: ({ children, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className="bg-gray-50 border border-gray-200 px-4 py-2 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className="border border-gray-200 px-4 py-2" {...props}>
      {children}
    </td>
  ),
};

// MDXContentProvider removed - using components directly with MDXRemote

export { components as mdxComponents }; 