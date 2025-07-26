'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface PostTOCProps {
  content: string;
}

export function PostTOC({ content }: PostTOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Парсим заголовки из markdown контента
    const lines = content.split('\n');
    const items: TOCItem[] = [];
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      // Проверяем на заголовки H1 и H2
      const h1Match = trimmedLine.match(/^# (.+)$/);
      const h2Match = trimmedLine.match(/^## (.+)$/);
      
      if (h1Match) {
        const title = h1Match[1].trim();
        const baseId = title
          .toLowerCase()
          .replace(/[^a-zа-я0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '') || 'heading';
        
        // Добавляем индекс для уникальности
        const id = `${baseId}-${items.length + 1}`;
        
        items.push({
          id,
          title,
          level: 1
        });
      } else if (h2Match) {
        const title = h2Match[1].trim();
        const baseId = title
          .toLowerCase()
          .replace(/[^a-zа-я0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '') || 'heading';
        
        // Добавляем индекс для уникальности
        const id = `${baseId}-${items.length + 1}`;
        
        items.push({
          id,
          title,
          level: 2
        });
      }
    });
    
    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Intersection Observer для отслеживания активного заголовка
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
      }
    );

    // Добавляем ID к заголовкам в DOM
    tocItems.forEach(({ id, title }) => {
      // Ищем заголовки по тексту
      const headings = document.querySelectorAll('h1, h2');
      headings.forEach((heading) => {
        if (heading.textContent?.trim() === title && !heading.id) {
          heading.id = id;
          observer.observe(heading);
        }
      });
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Card className="relative top-16">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Содержание</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left text-sm transition-colors duration-200 hover:text-primary ${
                item.level === 1 ? 'font-medium' : 'pl-4 font-normal'
              } ${
                activeId === item.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
} 