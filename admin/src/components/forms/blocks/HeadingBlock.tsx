import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HeadingBlock } from '@/types/block';

interface HeadingBlockComponentProps {
  block: HeadingBlock;
  onUpdate: (updates: Partial<HeadingBlock>) => void;
  disabled?: boolean;
}

export const HeadingBlockComponent: React.FC<HeadingBlockComponentProps> = ({
  block,
  onUpdate,
  disabled = false
}) => {
  const renderHeading = () => {
    const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
    const sizeClasses = {
      1: 'text-4xl font-bold',
      2: 'text-3xl font-bold', 
      3: 'text-2xl font-semibold',
      4: 'text-xl font-semibold',
      5: 'text-lg font-medium',
      6: 'text-base font-medium'
    };

    return (
      <HeadingTag className={sizeClasses[block.level]}>
        {block.content || 'Введите заголовок...'}
      </HeadingTag>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Заголовок H{block.level}</span>
        <span className="text-xs text-muted-foreground">
          {block.width === 'fullsize' ? 'Полная ширина' : 'Контейнер'}
        </span>
      </div>

      {/* Предварительный просмотр */}
      <div className="p-4 border rounded-lg bg-muted/50">
        {renderHeading()}
      </div>

      {/* Настройки */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heading-content">Текст заголовка</Label>
          <Input
            id="heading-content"
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            placeholder="Введите заголовок"
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label>Уровень заголовка</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
              <Button variant="outline" className="w-full justify-between">
                H{block.level}
                ▼
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full" align="start">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <DropdownMenuItem 
                  key={level}
                  onClick={() => onUpdate({ level: level as HeadingBlock['level'] })}
                >
                  H{level}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}; 