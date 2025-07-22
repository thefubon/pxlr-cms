import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SpacerBlock } from '@/types/block';

interface SpacerBlockComponentProps {
  block: SpacerBlock;
  onUpdate: (updates: Partial<SpacerBlock>) => void;
  disabled?: boolean;
}

export const SpacerBlockComponent: React.FC<SpacerBlockComponentProps> = ({
  block,
  onUpdate,
  disabled = false
}) => {
  const heightClasses = {
    sm: 'h-4',
    md: 'h-8', 
    lg: 'h-16',
    xl: 'h-32'
  };

  const heightLabels = {
    sm: 'Маленький (16px)',
    md: 'Средний (32px)',
    lg: 'Большой (64px)',
    xl: 'Очень большой (128px)'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Отступ</span>
        <span className="text-xs text-muted-foreground">
          {block.width === 'fullsize' ? 'Полная ширина' : 'Контейнер'}
        </span>
      </div>

      {/* Предварительный просмотр */}
      <div className="p-4 border rounded-lg bg-muted/50">
        <div className="flex items-center justify-center">
          <div className="bg-gray-300 border-2 border-dashed border-gray-400 w-full flex items-center justify-center">
            <div className={`${heightClasses[block.height]} flex items-center justify-center text-xs text-gray-500`}>
              {heightLabels[block.height]}
            </div>
          </div>
        </div>
      </div>

      {/* Настройки */}
      <div className="space-y-2">
        <Label>Размер отступа</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={disabled}>
            <Button variant="outline" className="w-full justify-between">
              {heightLabels[block.height]}
              ▼
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full" align="start">
            {Object.entries(heightLabels).map(([value, label]) => (
              <DropdownMenuItem 
                key={value}
                onClick={() => onUpdate({ height: value as SpacerBlock['height'] })}
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}; 