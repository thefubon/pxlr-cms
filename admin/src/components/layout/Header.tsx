import { Settings, User, Loader2, RefreshCw } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useServerStatus } from '@/hooks/useServerStatus';

export function Header() {
  const { isOnline, isLoading, lastChecked, error, checkNow } = useServerStatus();

  const getStatusDisplay = () => {
    if (isLoading) {
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        dot: 'bg-yellow-500',
        label: 'Проверка...',
        icon: <Loader2 className="h-3 w-3 animate-spin" />
      };
    }

    if (isOnline) {
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        dot: 'bg-green-500 animate-pulse',
        label: 'Сервер активен',
        icon: null
      };
    }

    return {
      bg: 'bg-red-50',
      text: 'text-red-700',
      dot: 'bg-red-500',
      label: 'Не активен',
      icon: null
    };
  };

  const statusDisplay = getStatusDisplay();

  const getTooltipContent = () => {
    const baseInfo = `Backend: ${import.meta.env.PROD ? 'Production' : 'Development'}`;
    
    if (isLoading) {
      return `${baseInfo}\nПроверка соединения...`;
    }
    
    if (isOnline) {
      return `${baseInfo}\nСтатус: Подключен\n${lastChecked ? `Последняя проверка: ${lastChecked.toLocaleTimeString()}` : ''}`;
    }
    
    return `${baseInfo}\nСтатус: Отключен\n${error ? `Ошибка: ${error}` : ''}\n${lastChecked ? `Последняя проверка: ${lastChecked.toLocaleTimeString()}` : ''}`;
  };

  return (
    <TooltipProvider>
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
      <SidebarTrigger className="-ml-1" />
      
      <div className="flex-1" />
      
      {/* Right side - Status and Actions */}
      <div className="flex items-center gap-3">
        {/* Server Status */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-sm cursor-help ${statusDisplay.bg} ${statusDisplay.text}`}>
                {statusDisplay.icon || <div className={`h-2 w-2 rounded-full ${statusDisplay.dot}`}></div>}
                <span>{statusDisplay.label}</span>
                {!isLoading && (
                  <button
                    onClick={checkNow}
                    className="ml-1 p-0.5 rounded hover:bg-black/10"
                    title="Проверить статус"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </button>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="whitespace-pre-line text-xs">
                {getTooltipContent()}
        </div>
            </TooltipContent>
          </Tooltip>

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
    </TooltipProvider>
  );
} 