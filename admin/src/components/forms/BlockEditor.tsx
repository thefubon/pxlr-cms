import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Plus,
  Settings,
  Trash2,
  Type,
  MousePointerClick,
  FileText,
  Image,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Block, BlockType, BlockEditorData } from '@/types/block';
import { MarkdownBlockComponent } from './blocks/MarkdownBlock';
import { ButtonBlockComponent } from './blocks/ButtonBlock';
import { HeadingBlockComponent } from './blocks/HeadingBlock';
import { ImageBlockComponent } from './blocks/ImageBlock';
import { SpacerBlockComponent } from './blocks/SpacerBlock';
import { v4 as uuidv4 } from 'uuid';

interface BlockEditorProps {
  value: string; // JSON строка с данными блоков
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  // Парсим данные из JSON или создаем пустую структуру
  const parseData = useCallback((): BlockEditorData => {
    if (!value || value.trim() === '') {
      return { blocks: [], version: '1.0' };
    }
    
    try {
      const parsed = JSON.parse(value);
      return parsed.blocks ? parsed : { blocks: [], version: '1.0' };
    } catch {
      // Если это старый формат (просто текст), создаем блок markdown
      const markdownBlock: Block = {
        id: uuidv4(),
        type: 'markdown',
        content: value,
        width: 'fullsize',
        order: 0
      };
      return {
        blocks: [markdownBlock],
        version: '1.0'
      };
    }
  }, [value]);

  const [data, setData] = useState<BlockEditorData>(parseData);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Обновляем данные и вызываем onChange
  const updateData = useCallback((newData: any) => {
    setData(newData);
    onChange(JSON.stringify(newData));
  }, [onChange]);

  // Добавляем новый блок
  const addBlock = useCallback((type: BlockType) => {
    const baseBlock = {
      id: uuidv4(),
      type,
      width: 'fullsize' as const,
      order: data.blocks.length,
    };

    let newBlock: Block;
    switch (type) {
      case 'markdown':
        newBlock = { ...baseBlock, type: 'markdown', content: '' };
        break;
      case 'button':
        newBlock = { 
          ...baseBlock, 
          type: 'button', 
          text: 'Кнопка', 
          href: '', 
          variant: 'default' as const, 
          size: 'default' as const 
        };
        break;
      case 'heading':
        newBlock = { 
          ...baseBlock, 
          type: 'heading', 
          level: 2 as const, 
          content: 'Заголовок' 
        };
        break;
      case 'image':
        newBlock = { 
          ...baseBlock, 
          type: 'image', 
          src: '', 
          alt: '', 
          caption: '' 
        };
        break;
      case 'spacer':
        newBlock = { 
          ...baseBlock, 
          type: 'spacer', 
          height: 'md' as const 
        };
        break;
      default:
        throw new Error(`Unknown block type: ${type}`);
    }

    const newData = {
      ...data,
      blocks: [...data.blocks, newBlock as any]
    };
    
    updateData(newData);
    setSelectedBlockId(newBlock.id);
  }, [data, updateData]);

  // Обновляем блок
  const updateBlock = useCallback((blockId: string, updates: Partial<Block>) => {
    const newData = {
      ...data,
      blocks: data.blocks.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      )
    };
    updateData(newData);
  }, [data, updateData]);

  // Удаляем блок
  const deleteBlock = useCallback((blockId: string) => {
    const newData = {
      ...data,
      blocks: data.blocks.filter(block => block.id !== blockId)
    };
    updateData(newData);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [data, updateData, selectedBlockId]);

  // Переключаем ширину блока
  const toggleBlockWidth = useCallback((blockId: string) => {
    const block = data.blocks.find(b => b.id === blockId);
    if (block) {
      updateBlock(blockId, { 
        width: block.width === 'fullsize' ? 'container' : 'fullsize' 
      });
    }
  }, [data.blocks, updateBlock]);

  // Перемещаем блок (простая реализация без библиотеки drag & drop)
  const moveBlock = useCallback((blockId: string, direction: 'up' | 'down') => {
    const blockIndex = data.blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const newBlocks = [...data.blocks];
    const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
    
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[blockIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[blockIndex]];
      
      // Обновляем order
      newBlocks.forEach((block, index) => {
        block.order = index;
      });

      updateData({ ...data, blocks: newBlocks });
    }
  }, [data, updateData]);



  // Рендерим блок
  const renderBlock = (block: Block) => {
    const isSelected = selectedBlockId === block.id;
    
    return (
      <div
        key={block.id}
        className={cn(
          "group relative",
          block.width === 'container' ? 'max-w-4xl mx-auto' : 'w-full'
        )}
      >
        <Card className={cn(
          "relative transition-all duration-200",
          isSelected && "ring-2 ring-primary",
          "hover:shadow-md"
        )}>
          {/* Панель управления блоком */}
          <div className={cn(
            "absolute -top-12 left-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
            isSelected && "opacity-100"
          )}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => moveBlock(block.id, 'up')}
              disabled={disabled}
            >
              ↑
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => moveBlock(block.id, 'down')}
              disabled={disabled}
            >
              ↓
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleBlockWidth(block.id)}
              disabled={disabled}
              title={block.width === 'fullsize' ? 'Сделать по контейнеру' : 'Сделать на всю ширину'}
            >
              {block.width === 'fullsize' ? '⬅️➡️' : '↔️'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setSelectedBlockId(isSelected ? null : block.id)}
              disabled={disabled}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => deleteBlock(block.id)}
              disabled={disabled}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

                    <CardContent className="p-4">
            {block.type === 'markdown' && (
              <MarkdownBlockComponent
                block={block as any}
                onUpdate={(updates: any) => updateBlock(block.id, updates)}
                disabled={disabled}
              />
            )}
            {block.type === 'button' && (
              <ButtonBlockComponent
                block={block as any}
                onUpdate={(updates: any) => updateBlock(block.id, updates)}
                disabled={disabled}
              />
            )}
            {block.type === 'heading' && (
              <HeadingBlockComponent
                block={block as any}
                onUpdate={(updates: any) => updateBlock(block.id, updates)}
                disabled={disabled}
              />
            )}
            {block.type === 'image' && (
              <ImageBlockComponent
                block={block as any}
                onUpdate={(updates: any) => updateBlock(block.id, updates)}
                disabled={disabled}
              />
            )}
            {block.type === 'spacer' && (
              <SpacerBlockComponent
                block={block as any}
                onUpdate={(updates: any) => updateBlock(block.id, updates)}
                disabled={disabled}
              />
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Пустое состояние
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Выберите компонент</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Создайте контент используя блоки. Каждый блок можно настроить и переместить.
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Добавить блок
          </Button>
        </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => addBlock('markdown')}>
            <FileText className="w-4 h-4 mr-2" />
            Markdown
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addBlock('heading')}>
            <Type className="w-4 h-4 mr-2" />
            Заголовок
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addBlock('button')}>
            <MousePointerClick className="w-4 h-4 mr-2" />
            Кнопка
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addBlock('image')}>
            <Image className="w-4 h-4 mr-2" />
            Изображение
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addBlock('spacer')}>
            <Minus className="w-4 h-4 mr-2" />
            Отступ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );



  return (
    <div className="space-y-4">
      {/* Панель управления */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={disabled}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить блок
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => addBlock('markdown')}>
              <FileText className="w-4 h-4 mr-2" />
              Markdown
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock('heading')}>
              <Type className="w-4 h-4 mr-2" />
              Заголовок
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock('button')}>
              <MousePointerClick className="w-4 h-4 mr-2" />
              Кнопка
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => addBlock('image')}>
              <Image className="w-4 h-4 mr-2" />
              Изображение
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock('spacer')}>
              <Minus className="w-4 h-4 mr-2" />
              Отступ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>



        {data.blocks.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {data.blocks.length} блоков
          </span>
        )}
      </div>

      {/* Содержимое */}
      <div className="min-h-[400px] border rounded-lg p-4">
        {data.blocks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {data.blocks
              .sort((a, b) => a.order - b.order)
              .map(renderBlock)}
          </div>
        )}
      </div>
    </div>
  );
};

 