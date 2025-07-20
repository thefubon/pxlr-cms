import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { PostSettings } from '@/components/settings/PostSettings';
import { Settings as SettingsIcon, Globe, FileText } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <SettingsIcon className="h-8 w-8" />
          Настройки
        </h1>
        <p className="text-muted-foreground">
          Конфигурация системы и настройки отображения контента
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Общие
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Посты
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Общие настройки</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Управление названием сайта, описанием и SEO параметрами
            </p>
          </div>
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="posts" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Настройки постов</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Управление отображением и пагинацией постов на сайте
            </p>
          </div>
          <PostSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
} 