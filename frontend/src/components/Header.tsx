'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { showAdminLinks, getAdminUrl } from '../../config/env.js';

interface MenuItem {
  id: string;
  name: string;
  url: string;
  order: number;
}

// Fallback меню на случай ошибки загрузки
const fallbackMenu: MenuItem[] = [
  { id: 'home', name: 'Главная', url: '/', order: 1 },
  { id: 'posts', name: 'Посты', url: '/posts', order: 2 },
  { id: 'about', name: 'О проекте', url: '/about', order: 3 },
  { id: 'contacts', name: 'Контакты', url: '/contacts', order: 4 }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState<MenuItem[]>(fallbackMenu);

  // Загружаем меню при монтировании компонента
  useEffect(() => {
    loadMenu();
    
    // Слушаем обновления меню из админки
    const handleMenuUpdate = (event: CustomEvent) => {
      setMenu(event.detail.menu);
    };
    
    window.addEventListener('menuUpdated', handleMenuUpdate as EventListener);
    
    return () => {
      window.removeEventListener('menuUpdated', handleMenuUpdate as EventListener);
    };
  }, []);

  // Функция загрузки меню с API
  const loadMenu = async () => {
    try {
      const response = await fetch('/api/menu');
      if (response.ok) {
        const apiMenu = await response.json();
        if (Array.isArray(apiMenu) && apiMenu.length > 0) {
          setMenu(apiMenu.sort((a, b) => a.order - b.order));
        }
      }
    } catch (error) {
      console.warn('Failed to load menu, using fallback:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            PXLR
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {menu.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {showAdminLinks() && (
              <a
                href={getAdminUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors text-sm"
              >
                ⚙️ Админка
              </a>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {menu.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {showAdminLinks() && (
                <a
                  href={getAdminUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors py-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ⚙️ Админка
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 