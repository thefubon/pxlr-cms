'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Folder, X, Filter } from 'lucide-react';

interface CategoriesFilterProps {
  categories: string[];
  selectedCategory?: string;
  totalPosts: number;
}

export function CategoriesFilter({ categories, selectedCategory, totalPosts }: CategoriesFilterProps) {
  const searchParams = useSearchParams();

  // Создаем URL без категории
  const createUrlWithoutCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    params.delete('page'); // Сбрасываем страницу при сбросе фильтра
    return `/posts?${params.toString()}`;
  };

  // Создаем URL с категорией
  const createUrlWithCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    params.delete('page'); // Сбрасываем страницу при изменении фильтра
    return `/posts?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Active Category Filter */}
      {selectedCategory && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Активная категория
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-sm capitalize">
                {selectedCategory}
              </Badge>
              <Button 
                asChild
                variant="ghost" 
                size="sm"
                className="h-auto p-1"
              >
                <Link href={createUrlWithoutCategory()}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Убрать фильтр категории</span>
                </Link>
              </Button>
            </div>
            
            <Button 
              asChild
              variant="outline" 
              size="sm" 
              className="mt-3 w-full"
            >
              <Link href={createUrlWithoutCategory()}>
                Показать все категории
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Категории
            <Badge variant="secondary" className="ml-auto">
              {categories.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Категории не найдены
            </p>
          ) : (
            <div className="space-y-3">
              {/* All Posts Link */}
              {!selectedCategory && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-md bg-primary/10">
                    <span className="text-sm font-medium">Все категории</span>
                    <Badge variant="secondary">{totalPosts}</Badge>
                  </div>
                  <Separator />
                </>
              )}
              
              {/* Individual Categories */}
              <div className="space-y-2">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  
                  return (
                    <Link
                      key={category}
                      href={createUrlWithCategory(category)}
                      className={`
                        flex items-center justify-between p-2 rounded-md transition-colors hover:bg-muted
                        ${isActive ? 'bg-primary/10 border border-primary/20' : ''}
                      `}
                    >
                      <span className={`text-sm capitalize ${isActive ? 'font-medium' : ''}`}>
                        {category}
                      </span>
                      
                      <Badge 
                        variant={isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {isActive ? '✓' : '📁'}
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
          <CardTitle className="text-base">О категориях</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Одна категория на пост</p>
          <p>• Нажмите для фильтрации</p>
          <p>• Используйте ✕ для сброса</p>
        </CardContent>
      </Card>
    </div>
  );
} 