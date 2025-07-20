'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tag, X, Filter } from 'lucide-react';

interface PostsFilterProps {
  tags: string[];
  selectedTag?: string;
  totalPosts: number;
}

export function PostsFilter({ tags, selectedTag, totalPosts }: PostsFilterProps) {
  const searchParams = useSearchParams();

  // Создаем URL без тега
  const createUrlWithoutTag = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('tag');
    params.delete('page'); // Сбрасываем страницу при сбросе фильтра
    return `/posts?${params.toString()}`;
  };

  // Создаем URL с тегом
  const createUrlWithTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tag', tag);
    params.delete('page'); // Сбрасываем страницу при изменении фильтра
    return `/posts?${params.toString()}`;
  };

  return (
    <div className="space-y-6 sticky top-8">
      {/* Active Filter */}
      {selectedTag && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Активный фильтр
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-sm">
                {selectedTag}
              </Badge>
              <Button 
                asChild
                variant="ghost" 
                size="sm"
                className="h-auto p-1"
              >
                <Link href={createUrlWithoutTag()}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Убрать фильтр</span>
                </Link>
              </Button>
            </div>
            
            <Button 
              asChild
              variant="outline" 
              size="sm" 
              className="mt-3 w-full"
            >
              <Link href={createUrlWithoutTag()}>
                Показать все посты
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tags List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Все теги
            <Badge variant="secondary" className="ml-auto">
              {tags.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Теги не найдены
            </p>
          ) : (
            <div className="space-y-3">
              {/* All Posts Link */}
              {!selectedTag && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-md bg-primary/10">
                    <span className="text-sm font-medium">Все посты</span>
                    <Badge variant="secondary">{totalPosts}</Badge>
                  </div>
                  <Separator />
                </>
              )}
              
              {/* Individual Tags */}
              <div className="space-y-2">
                {tags.map((tag) => {
                  const isActive = selectedTag === tag;
                  
                  return (
                    <Link
                      key={tag}
                      href={createUrlWithTag(tag)}
                      className={`
                        flex items-center justify-between p-2 rounded-md transition-colors hover:bg-muted
                        ${isActive ? 'bg-primary/10 border border-primary/20' : ''}
                      `}
                    >
                      <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                        {tag}
                      </span>
                      
                      <Badge 
                        variant={isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {/* Здесь можно добавить подсчет постов по тегу если нужно */}
                        #
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filter Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Информация</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Нажмите на тег для фильтрации</p>
          <p>• Используйте кнопку ✕ для сброса</p>
          <p>• Фильтры работают мгновенно</p>
        </CardContent>
      </Card>
    </div>
  );
} 