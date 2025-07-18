import { ReactNode } from 'react';
import { MDXLayout } from '@/components/MDXLayout';

type MDXComponents = {
  [key: string]: any;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX pages
    wrapper: ({ children }: { children: ReactNode }) => (
      <MDXLayout>{children}</MDXLayout>
    ),
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="text-3xl font-semibold mb-4 text-gray-900 mt-8">{children}</h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-2xl font-semibold mb-3 text-gray-900 mt-6">{children}</h3>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <h4 className="text-xl font-semibold mb-2 text-gray-900 mt-4">{children}</h4>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">{children}</ul>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">{children}</ol>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
    a: ({ children, href }: { children: ReactNode; href?: string }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4 text-gray-600">
        {children}
      </blockquote>
    ),
    code: ({ children }: { children: ReactNode }) => (
      <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }: { children: ReactNode }) => (
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
        <code className="text-sm">{children}</code>
      </pre>
    ),
    strong: ({ children }: { children: ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children: ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    ...components,
  };
} 