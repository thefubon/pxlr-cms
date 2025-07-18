import { ReactNode } from 'react';

interface MDXLayoutProps {
  children: ReactNode;
}

export function MDXLayout({ children }: MDXLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </div>
  );
} 