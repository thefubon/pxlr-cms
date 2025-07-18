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
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-8" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props}>
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href} 
      className="text-blue-600 hover:text-blue-700 underline" 
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className="rounded-lg shadow-md my-4 max-w-full h-auto"
      {...props}
    />
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="bg-gray-50 border border-gray-200 px-4 py-2 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border border-gray-200 px-4 py-2" {...props}>
      {children}
    </td>
  ),
};

// MDXContentProvider removed - using components directly with MDXRemote

export { components as mdxComponents }; 