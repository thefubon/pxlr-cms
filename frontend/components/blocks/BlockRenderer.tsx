import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  // Простой Markdown парсер для заголовков, параграфов и списков
  const renderMarkdown = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let key = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="list-disc list-inside mb-4">
            {currentList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(<h1 key={index} className="text-4xl font-bold mb-4">{trimmed.slice(2)}</h1>);
      } else if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={index} className="text-3xl font-bold mb-4">{trimmed.slice(3)}</h2>);
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={index} className="text-2xl font-semibold mb-3">{trimmed.slice(4)}</h3>);
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        currentList.push(trimmed.slice(2));
      } else if (trimmed) {
        flushList();
        elements.push(<p key={index} className="mb-4">{trimmed}</p>);
      }
    });

    flushList();
    return elements;
  };

  return <div className="prose prose-stone max-w-none prose-p:text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-blockquote:text-foreground prose-li:text-foreground">{renderMarkdown(content)}</div>;
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