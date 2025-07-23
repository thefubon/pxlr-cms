import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar.tsx';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header />
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-background w-full">
          <div className="w-full">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
} 