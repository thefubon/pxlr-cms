import { FileText, Plus, Home, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Дашборд', href: '/', icon: Home },
  { name: 'Все посты', href: '/posts', icon: FileText },
  { name: 'Новый пост', href: '/posts/new', icon: Plus },
  { name: 'Настройки', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();

  // Обработчик клика по навигационным ссылкам
  const handleNavClick = () => {
    // Закрываем сайдбар только в мобильной версии
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">PXLR CMS</h1>
            <p className="text-xs text-muted-foreground">Панель управления</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Основное</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-6 py-4">
        <div className="text-xs text-muted-foreground text-center">
                          <p>© 2025 PXLR CMS v0.5.0</p>
          <p className="mt-1">
            Сделано в{' '}
            <a
              href="https://fubon.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline">
              Fubon
            </a>
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
} 