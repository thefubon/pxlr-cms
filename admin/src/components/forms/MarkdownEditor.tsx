import React, { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Eye,
  Edit
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Напишите ваш Markdown текст..."
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Функции для вставки markdown
  const insertText = (before: string, after: string = '', placeholder: string = 'текст') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newValue = 
      value.substring(0, start) + 
      before + textToInsert + after + 
      value.substring(end);
    
    onChange(newValue);

    // Восстанавливаем фокус и выделение
    setTimeout(() => {
      textarea.focus();
      const newStart = start + before.length;
      const newEnd = newStart + textToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  const insertLine = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lines = value.split('\n');
    
    // Находим строку где находится курсор
    let currentPos = 0;
    let lineIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (currentPos + lines[i].length >= start) {
        lineIndex = i;
        break;
      }
      currentPos += lines[i].length + 1; // +1 для \n
    }

    // Добавляем префикс к строке
    lines[lineIndex] = prefix + lines[lineIndex];
    const newValue = lines.join('\n');
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  // Функции для форматирования
  const makeBold = () => insertText('**', '**', 'жирный текст');
  const makeItalic = () => insertText('*', '*', 'курсив');
  const makeHeading1 = () => insertLine('# ');
  const makeHeading2 = () => insertLine('## ');
  const makeHeading3 = () => insertLine('### ');
  const makeLink = () => insertText('[', '](url)', 'текст ссылки');
  const makeImage = () => insertText('![', '](url)', 'alt текст');
  const makeBulletList = () => insertLine('- ');
  const makeNumberedList = () => insertLine('1. ');
  const makeQuote = () => insertLine('> ');
  const makeCode = () => insertText('`', '`', 'код');

  // Простой рендер markdown для предварительного просмотра
  const renderMarkdown = (text: string) => {
    return text
      // Заголовки
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      
      // Жирный и курсив
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Ссылки
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      
      // Изображения
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
      
      // Код
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      
      // Блоки кода
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      
      // Цитаты
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      
      // Списки
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^1\. (.*$)/gim, '<li>$1</li>')
      
      // Переносы строк
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="w-full">
      {/* Панель инструментов */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-wrap items-center gap-1">
          {/* Заголовки */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeHeading1}
              className="h-8 w-8 p-0"
              title="Заголовок 1"
              disabled={disabled}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeHeading2}
              className="h-8 w-8 p-0"
              title="Заголовок 2"
              disabled={disabled}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeHeading3}
              className="h-8 w-8 p-0"
              title="Заголовок 3"
              disabled={disabled}
            >
              <Heading3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Форматирование текста */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeBold}
              className="h-8 w-8 p-0"
              title="Жирный (**текст**)"
              disabled={disabled}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeItalic}
              className="h-8 w-8 p-0"
              title="Курсив (*текст*)"
              disabled={disabled}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeCode}
              className="h-8 w-8 p-0"
              title="Код (`код`)"
              disabled={disabled}
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>

          {/* Списки */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeBulletList}
              className="h-8 w-8 p-0"
              title="Маркированный список (- пункт)"
              disabled={disabled}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeNumberedList}
              className="h-8 w-8 p-0"
              title="Нумерованный список (1. пункт)"
              disabled={disabled}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          {/* Медиа и элементы */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeLink}
              className="h-8 w-8 p-0"
              title="Ссылка ([текст](url))"
              disabled={disabled}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeImage}
              className="h-8 w-8 p-0"
              title="Изображение (![alt](url))"
              disabled={disabled}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={makeQuote}
              className="h-8 w-8 p-0"
              title="Цитата (> текст)"
              disabled={disabled}
            >
              <Quote className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs для переключения между редактированием и предварительным просмотром */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'edit' | 'preview')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Код
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Превью
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-0">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[400px] font-mono text-sm resize-none border-0 border-t border-gray-200 dark:border-gray-700 rounded-none rounded-b-lg focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="min-h-[400px] p-4 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg bg-white dark:bg-gray-950">
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(value) || '<p className="text-gray-500">Начните писать, чтобы увидеть предварительный просмотр...</p>' }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 