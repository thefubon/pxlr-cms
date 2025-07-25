import React, { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Type,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  CheckSquare,
  Highlighter,
  Loader2,
  Undo,
  Redo
} from 'lucide-react';
import { getBackendUrl } from '@/lib/utils';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Начните писать..."
}) => {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isUploading, setIsUploading] = useState(false);
  const floatingMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      Color.configure({ types: [TextStyle.name, 'heading'] }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Superscript,
      Subscript,
      FloatingMenuExtension,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Placeholder.configure({
        placeholder: placeholder,
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      // Показываем floating menu когда редактор пустой или курсор в пустой строке
      const { empty, $from } = editor.state.selection;
      const isEmptyParagraph = $from.parent.textContent === '';
      const isEmpty = editor.isEmpty;
      
      if ((empty && isEmptyParagraph) || isEmpty) {
        setShowFloatingMenu(true);
        
        // Используем более надежный способ получения позиции через ProseMirror
        setTimeout(() => {
          try {
            const { view } = editor;
            const { from } = editor.state.selection;
            const coords = view.coordsAtPos(from);
            
            if (coords) {
              setMenuPosition({
                top: coords.top - 50,
                left: Math.max(10, coords.left - 100)
              });
            } else {
              // Fallback к стандартному методу
              const domRange = window.getSelection()?.getRangeAt(0);
              if (domRange) {
                const rect = domRange.getBoundingClientRect();
                setMenuPosition({
                  top: rect.top - 50,
                  left: Math.max(10, rect.left - 100)
                });
              }
            }
          } catch (error) {
            console.warn('Error calculating FloatingMenu position:', error);
            // Устанавливаем позицию по умолчанию
            setMenuPosition({
              top: 100,
              left: 50
            });
          }
        }, 0);
      } else {
        setShowFloatingMenu(false);
      }
    },
    editable: !disabled,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
        'data-placeholder': placeholder,
      },
    },
  });

  const addHeading = (level: 1 | 2 | 3) => {
    editor?.chain().focus().toggleHeading({ level }).run();
    setShowFloatingMenu(false);
  };

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  const toggleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
    setShowFloatingMenu(false);
  };

  const toggleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
    setShowFloatingMenu(false);
  };

  const toggleBlockquote = () => {
    editor?.chain().focus().toggleBlockquote().run();
    setShowFloatingMenu(false);
  };

  const toggleCodeBlock = () => {
    editor?.chain().focus().toggleCodeBlock().run();
    setShowFloatingMenu(false);
  };

  const setAlignment = (alignment: 'left' | 'center' | 'right') => {
    editor?.chain().focus().setTextAlign(alignment).run();
  };

  const addHorizontalRule = () => {
    editor?.chain().focus().setHorizontalRule().run();
    setShowFloatingMenu(false);
  };

  // Функции для загрузки изображений
  const handleImageUpload = async (file: File) => {
    if (file.size > 1024 * 1024) {
      toast.error('Размер файла не должен превышать 1MB');
      return;
    }

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
      const imageUrl = data.url.startsWith('/uploads/') 
        ? `${getBackendUrl()}${data.url}` 
        : data.url;

      editor?.chain().focus().setImage({ src: imageUrl, alt: data.originalName || 'Загруженное изображение' }).run();
      toast.success('Изображение успешно загружено');
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      toast.error(error instanceof Error ? error.message : 'Ошибка загрузки файла');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const addImage = () => {
    fileInputRef.current?.click();
  };

  // Функции для ссылок
  const addLink = () => {
    const url = window.prompt('Введите URL:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  // Функции для таблиц
  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    setShowFloatingMenu(false);
  };

  // Функции для выделения и цвета
  const toggleHighlight = () => {
    editor?.chain().focus().toggleHighlight().run();
  };

  const setTextColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  // Функции для задач
  const toggleTaskList = () => {
    editor?.chain().focus().toggleTaskList().run();
    setShowFloatingMenu(false);
  };

  // Функции отмены/повтора
  const undo = () => {
    editor?.chain().focus().undo().run();
  };

  const redo = () => {
    editor?.chain().focus().redo().run();
  };

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Управление escape для floating menu
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showFloatingMenu) {
        setShowFloatingMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showFloatingMenu]);

  if (!editor) {
    return null;
  }

  // Рендер панели инструментов
  const renderToolbar = () => {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-wrap items-center gap-1">
          {/* Отмена/Повтор */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={undo}
              className="h-8 w-8 p-0"
              title="Отменить"
              disabled={!editor?.can().undo()}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={redo}
              className="h-8 w-8 p-0"
              title="Повторить"
              disabled={!editor?.can().redo()}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          {/* Заголовки */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => addHeading(1)}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('heading', { level: 1 }) && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Заголовок 1"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => addHeading(2)}
              className={cn(
                "h-8 px-2 text-sm font-bold",
                editor?.isActive('heading', { level: 2 }) && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Заголовок 2"
            >
              H2
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => addHeading(3)}
              className={cn(
                "h-8 px-2 text-sm font-bold",
                editor?.isActive('heading', { level: 3 }) && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Заголовок 3"
            >
              H3
            </Button>
          </div>

          {/* Форматирование текста */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleBold}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('bold') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Жирный"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleItalic}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('italic') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Курсив"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleUnderline}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('underline') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Подчеркнутый"
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleHighlight}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('highlight') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Выделить"
            >
              <Highlighter className="h-4 w-4" />
            </Button>
          </div>

          {/* Цвета */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <input
              type="color"
              onChange={(e) => setTextColor(e.target.value)}
              className="h-8 w-8 border border-gray-300 rounded cursor-pointer"
              title="Цвет текста"
            />
          </div>

          {/* Списки */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleBulletList}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('bulletList') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Маркированный список"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleOrderedList}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('orderedList') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Нумерованный список"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleTaskList}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('taskList') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Список задач"
            >
              <CheckSquare className="h-4 w-4" />
            </Button>
          </div>

          {/* Выравнивание */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAlignment('left')}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive({ textAlign: 'left' }) && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="По левому краю"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAlignment('center')}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive({ textAlign: 'center' }) && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="По центру"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAlignment('right')}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive({ textAlign: 'right' }) && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="По правому краю"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Медиа и ссылки */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addImage}
              className="h-8 w-8 p-0"
              title="Добавить изображение"
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImageIcon className="h-4 w-4" />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addLink}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('link') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Добавить ссылку"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={insertTable}
              className="h-8 w-8 p-0"
              title="Вставить таблицу"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Дополнительные элементы */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleBlockquote}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('blockquote') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Цитата"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleCodeBlock}
              className={cn(
                "h-8 w-8 p-0",
                editor?.isActive('codeBlock') && 'bg-gray-200 dark:bg-gray-600'
              )}
              title="Блок кода"
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addHorizontalRule}
              className="h-8 w-8 p-0"
              title="Горизонтальная линия"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Рендер плавающего меню
  const renderFloatingMenu = () => {
    if (!showFloatingMenu) return null;

    return (
      <div
        ref={floatingMenuRef}
        className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2"
        style={{
          top: `${Math.max(10, menuPosition.top)}px`,
          left: `${Math.max(10, Math.min(window.innerWidth - 420, menuPosition.left))}px`,
        }}
      >
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => addHeading(1)}
            className="h-8 px-2 text-sm"
            title="Заголовок 1"
          >
            H1
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => addHeading(2)}
            className="h-8 px-2 text-sm"
            title="Заголовок 2"
          >
            H2
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleBulletList}
            className="h-8 w-8 p-0"
            title="Список"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertTable}
            className="h-8 w-8 p-0"
            title="Таблица"
          >
            <TableIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addImage}
            className="h-8 w-8 p-0"
            title="Изображение"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Панель инструментов */}
      {renderToolbar()}

      {/* Контент редактора */}
      <div className="border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg min-h-[400px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 relative">
        <EditorContent
          editor={editor}
          className="tiptap-editor"
        />
        
        {/* Плавающее меню */}
        {renderFloatingMenu()}

        {/* Скрытый input для загрузки файлов */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          className="hidden"
        />
      </div>

      {/* Статистика */}
      {editor && (
        <div className="mt-2 text-xs text-gray-500">
          <span>
            {editor.storage.characterCount.characters()} символов, {editor.storage.characterCount.words()} слов
          </span>
        </div>
      )}
    </div>
  );
}; 