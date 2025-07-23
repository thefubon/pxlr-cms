'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { remark } from 'remark';
import html from 'remark-html';

type BlockType = 'markdown' | 'button' | 'heading' | 'image' | 'spacer';
type BlockWidth = 'fullsize' | 'container';

interface BaseBlock {
  id: string;
  type: BlockType;
  width: BlockWidth;
  order: number;
}

interface MarkdownBlock extends BaseBlock {
  type: 'markdown';
  content: string;
}

interface ButtonBlock extends BaseBlock {
  type: 'button';
  text: string;
  href: string;
  variant: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  size: 'sm' | 'default' | 'lg';
  iconLeft?: string;
  iconRight?: string;
  className?: string;
}

interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}

interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  height: 'sm' | 'md' | 'lg' | 'xl';
}

type Block = MarkdownBlock | ButtonBlock | HeadingBlock | ImageBlock | SpacerBlock;

interface BlockRendererProps {
  content: string; // JSON строка с блоками или обычный текст
}

// Компонент для рендеринга Markdown
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Качественный рендер markdown используя remark (синхронно)
  const renderMarkdown = (text: string) => {
    if (!text) return '';
    try {
      const processedContent = remark()
        .use(html, { sanitize: false })
        .processSync(text);
      return processedContent.toString();
    } catch (error) {
      console.error('Markdown parsing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return `<p>Ошибка парсинга Markdown: ${errorMessage}</p>`;
    }
  };

  const htmlContent = renderMarkdown(content);

  return (
    <div 
      className="prose prose-stone max-w-none dark:prose-invert
                 prose-p:mb-6 prose-p:mt-0 prose-p:text-foreground
                 prose-h1:mb-6 prose-h1:mt-6 prose-h1:text-foreground
                 prose-h2:mb-6 prose-h2:mt-5 prose-h2:text-foreground
                 prose-h3:mb-6 prose-h3:mt-4 prose-h3:text-foreground
                 prose-ul:mb-6 prose-ul:mt-2 prose-ul:text-foreground
                 prose-ol:mb-6 prose-ol:mt-2 prose-ol:text-foreground
                 prose-li:mb-1 prose-li:mt-0 prose-li:text-foreground prose-li:leading-relaxed
                 prose-blockquote:mb-6 prose-blockquote:mt-3 prose-blockquote:text-foreground prose-blockquote:border-l-primary
                 prose-pre:mb-6 prose-pre:mt-3 prose-pre:bg-slate-50 prose-pre:text-slate-900 prose-pre:border prose-pre:rounded-lg prose-pre:p-3
                 prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                 dark:prose-code:bg-slate-800 dark:prose-code:text-slate-100
                 dark:prose-pre:bg-slate-900 dark:prose-pre:text-slate-100
                 prose-strong:text-foreground prose-strong:font-semibold
                 prose-em:text-foreground
                 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

// Компонент для рендеринга отдельного блока
const BlockComponent: React.FC<{ block: Block }> = ({ block }) => {
  const containerClass = block.width === 'container' ? 'max-w-4xl mx-auto' : 'w-full';

  switch (block.type) {
    case 'markdown':
      return (
        <div className={containerClass}>
          <MarkdownRenderer content={block.content} />
        </div>
      );

    case 'button':
      // Предустановленные стили для кнопок
      const buttonStyles = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      };

      // Объединяем базовые стили с кастомными классами
      const getButtonClassName = () => {
        const baseStyles = buttonStyles[block.variant] || buttonStyles.default;
        return cn(baseStyles, block.className);
      };

      return (
        <div className={`${containerClass} flex justify-center pointer-events-none`}>
          <div className="pointer-events-auto">
            {block.href ? (
              <Button
                variant={block.variant}
                size={block.size}
                className={getButtonClassName()}
                asChild
              >
                <a 
                  href={block.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {block.text}
                </a>
              </Button>
            ) : (
              <Button
                variant={block.variant}
                size={block.size}
                className={getButtonClassName()}
              >
                {block.text}
              </Button>
            )}
          </div>
        </div>
      );

    case 'heading':
      const headingClasses = {
        1: 'text-4xl font-bold',
        2: 'text-3xl font-bold',
        3: 'text-2xl font-semibold',
        4: 'text-xl font-semibold',
        5: 'text-lg font-medium',
        6: 'text-base font-medium'
      };

      const renderHeading = () => {
        switch (block.level) {
          case 1: return <h1 className={`${headingClasses[1]} mb-4`}>{block.content}</h1>;
          case 2: return <h2 className={`${headingClasses[2]} mb-4`}>{block.content}</h2>;
          case 3: return <h3 className={`${headingClasses[3]} mb-4`}>{block.content}</h3>;
          case 4: return <h4 className={`${headingClasses[4]} mb-4`}>{block.content}</h4>;
          case 5: return <h5 className={`${headingClasses[5]} mb-4`}>{block.content}</h5>;
          case 6: return <h6 className={`${headingClasses[6]} mb-4`}>{block.content}</h6>;
          default: return <h2 className={`${headingClasses[2]} mb-4`}>{block.content}</h2>;
        }
      };

      return (
        <div className={containerClass}>
          {renderHeading()}
        </div>
      );

    case 'image':
      return (
        <div className={containerClass}>
          <div className="space-y-2">
            {block.src && block.src.trim() ? (
              <div className="relative w-full h-auto">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Изображение не загружено</span>
              </div>
            )}
            {block.caption && (
              <p className="text-sm text-gray-600 text-center italic">
                {block.caption}
              </p>
            )}
          </div>
        </div>
      );

    case 'spacer':
      const spacerHeights = {
        sm: 'h-4',
        md: 'h-8',
        lg: 'h-16',
        xl: 'h-32'
      };

      return <div className={spacerHeights[block.height]} />;

    default:
      return null;
  }
};

// Основной компонент для рендеринга блоков
export const BlockRenderer: React.FC<BlockRendererProps> = ({ content }) => {
  // Проверяем, является ли контент JSON с блоками
  const parseContent = (): { blocks: Block[]; isBlockFormat: boolean } => {
    if (!content || content.trim() === '') {
      return { blocks: [], isBlockFormat: false };
    }

    try {
      const parsed = JSON.parse(content);
      if (parsed.blocks && Array.isArray(parsed.blocks)) {
        return { blocks: parsed.blocks, isBlockFormat: true };
      }
    } catch {
      // Не JSON или некорректный JSON
    }

    // Возвращаем как обычный текст
    return { blocks: [], isBlockFormat: false };
  };

  const { blocks, isBlockFormat } = parseContent();

  // Если это новый блочный формат
  if (isBlockFormat && blocks.length > 0) {
    return (
      <div className="space-y-8">
        {blocks
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <BlockComponent key={block.id} block={block} />
          ))}
      </div>
    );
  }

  // Если это старый текстовый формат, рендерим как Markdown
  return (
    <div className="max-w-4xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}; 