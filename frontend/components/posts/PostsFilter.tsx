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
  selectedTags?: string[];
  totalPosts: number;
}

export function PostsFilter({ tags, selectedTags = [], totalPosts }: PostsFilterProps) {
  const searchParams = useSearchParams();

  // Создаем URL без всех тегов
  const createUrlWithoutTags = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('tags');
    params.delete('page'); // Сбрасываем страницу при сбросе фильтра
    return `/posts?${params.toString()}`;
  };

  // Создаем URL с добавлением/удалением тега
  const createUrlWithToggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isSelected = selectedTags.includes(tag);
    
    let newSelectedTags: string[];
    
    if (isSelected) {
      // Убираем тег из выбранных
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      // Добавляем тег к выбранным
      newSelectedTags = [...selectedTags, tag];
    }
    
    params.delete('page'); // Сбрасываем страницу при изменении фильтра
    
    if (newSelectedTags.length === 0) {
      params.delete('tags');
    } else {
      params.set('tags', newSelectedTags.join(','));
    }
    
    return `/posts?${params.toString()}`;
  };

  // Создаем URL для удаления конкретного тега
  const createUrlWithoutSpecificTag = (tagToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const newSelectedTags = selectedTags.filter(t => t !== tagToRemove);
    
    params.delete('page');
    
    if (newSelectedTags.length === 0) {
      params.delete('tags');
    } else {
      params.set('tags', newSelectedTags.join(','));
    }
    
    return `/posts?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {selectedTags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Активные фильтры
              <Badge
                variant="secondary"
                className="ml-auto">
                {selectedTags.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Список выбранных тегов */}
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1">
                    <Badge
                      variant="default"
                      className="text-sm">
                      {tag}
                    </Badge>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1">
                      <Link href={createUrlWithoutSpecificTag(tag)}>
                        <X className="h-3 w-3" />
                        <span className="sr-only">Убрать тег {tag}</span>
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full">
                <Link href={createUrlWithoutTags()}>Очистить все фильтры</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Теги
            <Badge
              variant="secondary"
              className="ml-auto">
              {tags.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <p className="text-muted-foreground text-sm">Теги не найдены</p>
          ) : (
            <div className="space-y-3">
              {/* All Posts Link */}
              {selectedTags.length === 0 && (
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
                  const isActive = selectedTags.includes(tag)

                  return (
                    <Link
                      key={tag}
                      href={createUrlWithToggleTag(tag)}
                      className={`
                        flex items-center justify-between p-2 rounded-md transition-colors hover:bg-muted cursor-pointer
                        ${
                          isActive
                            ? 'bg-primary/10 border border-primary/20'
                            : ''
                        }
                      `}>
                      <span
                        className={`text-sm ${isActive ? 'font-medium' : ''}`}>
                        {tag}
                      </span>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={isActive ? 'default' : 'secondary'}
                          className="text-xs">
                          {isActive ? '✓' : '+'}
                        </Badge>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 