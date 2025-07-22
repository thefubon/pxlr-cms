import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { MarkdownBlock } from '@/types/block';

interface MarkdownBlockComponentProps {
  block: MarkdownBlock;
  onUpdate: (updates: Partial<MarkdownBlock>) => void;
  disabled?: boolean;
}

export const MarkdownBlockComponent: React.FC<MarkdownBlockComponentProps> = ({
  block,
  onUpdate,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Markdown</span>
        <span className="text-xs text-muted-foreground">
          {block.width === 'fullsize' ? 'Полная ширина' : 'Контейнер'}
        </span>
      </div>
      <Textarea
        value={block.content}
        onChange={(e) => onUpdate({ content: e.target.value })}
        placeholder="Введите Markdown текст..."
        disabled={disabled}
        className="min-h-[120px] font-mono text-sm"
      />
      <div className="text-xs text-muted-foreground">
        Поддерживается полное форматирование Markdown
      </div>
    </div>
  );
}; 