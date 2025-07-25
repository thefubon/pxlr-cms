import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageBlock as ImageBlockType } from '@/types/block';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getBackendUrl } from '@/lib/utils';

interface ImageBlockComponentProps {
  block: ImageBlockType;
  onUpdate: (updates: Partial<ImageBlockType>) => void;
  disabled?: boolean;
}

export const ImageBlockComponent: React.FC<ImageBlockComponentProps> = ({
  block,
  onUpdate,
  disabled = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем размер файла (1MB)
    if (file.size > 1024 * 1024) {
      toast.error('Размер файла не должен превышать 1MB');
      return;
    }

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      toast.error('Поддерживаются только изображения');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${getBackendUrl()}/api/uploads/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка загрузки файла');
      }

      const data = await response.json();
      
      // Обновляем блок с новым URL
      onUpdate({ 
        src: data.url,
        alt: block.alt || data.originalName || 'Загруженное изображение'
      });

      toast.success('Изображение успешно загружено');
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      toast.error(error instanceof Error ? error.message : 'Ошибка загрузки файла');
    } finally {
      setIsUploading(false);
      // Очищаем input для возможности повторной загрузки того же файла
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Изображение</span>
        <span className="text-xs text-muted-foreground">
          {block.width === 'fullsize' ? 'Полная ширина' : 'Контейнер'}
        </span>
      </div>

      {/* Предварительный просмотр */}
      <div className="p-4 border rounded-lg bg-muted/50">
        {block.src && block.src.trim() ? (
          <div className="space-y-2">
            <img
              src={block.src.startsWith('/uploads/') ? block.src : block.src}
              alt={block.alt}
              className="max-w-full h-auto rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center italic">
                {block.caption}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-muted rounded">
            <span className="text-muted-foreground">Изображение не загружено</span>
          </div>
        )}
      </div>

      {/* Настройки */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-src">URL изображения</Label>
          <div className="flex gap-2">
            <Input
              id="image-src"
              value={block.src}
              onChange={(e) => onUpdate({ src: e.target.value })}
              placeholder="https://example.com/image.jpg"
              disabled={disabled}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              className="shrink-0"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Загрузить
                </>
              )}
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            Поддерживаются изображения до 1MB
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-alt">Альтернативный текст</Label>
          <Input
            id="image-alt"
            value={block.alt}
            onChange={(e) => onUpdate({ alt: e.target.value })}
            placeholder="Описание изображения"
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-caption">Подпись (опционально)</Label>
          <Input
            id="image-caption"
            value={block.caption || ''}
            onChange={(e) => onUpdate({ caption: e.target.value })}
            placeholder="Подпись к изображению"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}; 