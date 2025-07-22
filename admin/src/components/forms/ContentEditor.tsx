import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Code, 
  Maximize2, 
  X,
  Package,
  MousePointerClick
} from 'lucide-react';
import { cn } from '@/lib/utils';

type EditorMode = 'normal' | 'code' | 'fullscreen';

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Получаем правильную высоту для редактора в зависимости от режима
const getEditorHeight = (mode: EditorMode, isFullscreen: boolean) => {
  if (isFullscreen) return 'h-full';
  if (mode === 'code') return 'h-[600px]';
  return 'h-[400px]';
};

// Компонент полноэкранного режима
const FullscreenEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  disabled: boolean;
  placeholder: string;
}> = ({ value, onChange, onClose, disabled, placeholder }) => {
  const fullscreenTextareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Полноэкранный редактор</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <Textarea
            ref={fullscreenTextareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-full resize-none font-mono text-sm"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export const ContentEditor: React.FC<ContentEditorProps> = ({
  value,
  onChange,
  placeholder = "Напишите ваш пост в формате Markdown...",
  disabled = false
}) => {
  const [mode, setMode] = useState<EditorMode>('normal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Функция для вставки компонента в позицию курсора
  const insertComponent = (componentText: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Создаем новый текст с вставленным компонентом
    const newValue = value.substring(0, start) + componentText + value.substring(end);
    
    // Обновляем значение
    onChange(newValue);
    
    // Устанавливаем курсор после вставленного текста
    setTimeout(() => {
      if (textarea) {
        const newCursorPosition = start + componentText.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  // Обработка нажатия Escape для выхода из полноэкранного режима
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        document.body.style.overflow = '';
      }
    };

    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!isFullscreen) {
        document.body.style.overflow = '';
      }
    };
  }, [isFullscreen]);

  const handleModeChange = (newMode: EditorMode) => {
    if (newMode === 'fullscreen') {
      setIsFullscreen(true);
      setMode('normal');
    } else {
      setMode(newMode);
    }
  };

  const handleFullscreenClose = () => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
  };

  if (isFullscreen) {
    return (
      <FullscreenEditor
        value={value}
        onChange={onChange}
        onClose={handleFullscreenClose}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  }

  const editorHeight = getEditorHeight(mode, isFullscreen);

  return (
    <div className="space-y-4">
      {/* Панель кнопок */}
      <div className="flex items-center gap-2">
        <Button
          variant={mode === 'code' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleModeChange(mode === 'code' ? 'normal' : 'code')}
          disabled={disabled}
        >
          <Code className="w-4 h-4 mr-2" />
          Код
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleModeChange('fullscreen')}
          disabled={disabled}
        >
          <Maximize2 className="w-4 h-4 mr-2" />
          Развернуть
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={disabled}>
              <Package className="w-4 h-4 mr-2" />
              Компоненты
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => insertComponent('<button href="" size="lg" iconLeft="" iconRight="" variant="default">Кнопка</button>')}
            >
              <MousePointerClick className="w-4 h-4 mr-2" />
              Кнопка CTA
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Редактор */}
      <div className={cn('space-y-4', editorHeight)}>
        <div className="h-full">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "resize-none transition-all duration-200",
              mode === 'code' ? 'font-mono text-sm' : 'font-sans',
              "h-full"
            )}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}; 