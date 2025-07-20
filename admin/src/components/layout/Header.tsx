import { Settings, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
      <SidebarTrigger className="-ml-1" />
      
      <div className="flex-1" />
      
      {/* Right side - Status and Actions */}
      <div className="flex items-center gap-3">
        {/* Server Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Сервер активен</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-md hover:bg-accent" aria-label="Настройки">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <button className="p-2 rounded-md hover:bg-accent" aria-label="Профиль">
            <User className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
} 