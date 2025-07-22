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
import { ButtonBlock } from '@/types/block';
import { cn } from '@/lib/utils';

interface ButtonBlockComponentProps {
  block: ButtonBlock;
  onUpdate: (updates: Partial<ButtonBlock>) => void;
  disabled?: boolean;
}

export const ButtonBlockComponent: React.FC<ButtonBlockComponentProps> = ({
  block,
  onUpdate,
  disabled = false
}) => {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Кнопка</span>
        <span className="text-xs text-muted-foreground">
          {block.width === 'fullsize' ? 'Полная ширина' : 'Контейнер'}
        </span>
      </div>

      {/* Предварительный просмотр */}
      <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
        <Button
          variant={block.variant}
          size={block.size}
          className={cn(getButtonClassName())}
          disabled
        >
          {block.text}
        </Button>
      </div>

      {/* Настройки */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="button-text">Текст кнопки</Label>
          <Input
            id="button-text"
            value={block.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            placeholder="Текст кнопки"
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="button-href">Ссылка</Label>
          <Input
            id="button-href"
            value={block.href}
            onChange={(e) => onUpdate({ href: e.target.value })}
            placeholder="https://example.com"
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label>Вариант</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
              <Button variant="outline" className="w-full justify-between">
                {block.variant === 'default' && 'Обычная'}
                {block.variant === 'outline' && 'Контур'}
                {block.variant === 'secondary' && 'Вторичная'}
                {block.variant === 'destructive' && 'Опасная'}
                {block.variant === 'ghost' && 'Прозрачная'}
                {block.variant === 'link' && 'Ссылка'}
                ▼
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full" align="start">
              <DropdownMenuItem onClick={() => onUpdate({ variant: 'default' })}>
                Обычная
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate({ variant: 'outline' })}>
                Контур
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate({ variant: 'secondary' })}>
                Вторичная
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate({ variant: 'destructive' })}>
                Опасная
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate({ variant: 'ghost' })}>
                Прозрачная
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate({ variant: 'link' })}>
                Ссылка
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <Label>Размер</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
              <Button variant="outline" className="w-full justify-between">
                {block.size === 'sm' && 'Маленькая'}
                {block.size === 'default' && 'Обычная'}
                {block.size === 'lg' && 'Большая'}
                ▼
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full" align="start">
              <DropdownMenuItem onClick={() => onUpdate({ size: 'sm' })}>
                Маленькая
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate({ size: 'default' })}>
                Обычная
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate({ size: 'lg' })}>
                Большая
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="button-class">Дополнительные стили</Label>
        <Input
          id="button-class"
          value={block.className || ''}
          onChange={(e) => onUpdate({ className: e.target.value })}
          placeholder="bg-blue-500 text-white px-8 py-3"
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground">
          Можно использовать любые Tailwind классы. Они автоматически объединятся с базовыми стилями.
        </p>
      </div>
    </div>
  );
}; 