# PXLR CMS - Админ-панель

Современная админ-панель для управления контентом, построенная на React + Vite + shadcn/ui.

## 🚀 Технологии

- **React 18** - UI библиотека
- **TypeScript** - типобезопасность
- **Vite** - быстрая сборка
- **shadcn/ui** - современные UI компоненты
- **TanStack Query** - управление состоянием
- **React Router** - маршрутизация
- **Tailwind CSS** - стилизация

## 📋 Возможности

- ✅ **Responsive дизайн** - адаптивность для всех устройств
- ✅ **Современный Sidebar** - профессиональная навигация
- ✅ **Компонентная архитектура** - переиспользуемые UI элементы
- ✅ **TypeScript** - полная типобезопасность
- ✅ **Темная тема** - готовность к расширению
- ✅ **API интеграция** - взаимодействие с backend

## 🛠️ Команды

### Разработка
```bash
# Только админка
npm run dev

# Из корня проекта
npm run dev:admin

# Открыть админку в браузере
npm run open:admin  # из корня
```

### Сборка
```bash
npm run build
```

## 🌐 Доступ

- **Development**: http://localhost:5173
- **Production**: зависит от деплоя

## 📁 Структура

```
src/
├── components/
│   ├── layout/          # Layout компоненты
│   │   ├── Layout.tsx   # Главный layout
│   │   ├── AppSidebar.tsx  # Sidebar навигация
│   │   └── Header.tsx   # Заголовок
│   └── ui/              # shadcn/ui компоненты
│       ├── sidebar.tsx
│       ├── button.tsx
│       └── ...
├── routes/              # Страницы
│   ├── Dashboard.tsx    # Главная страница
│   ├── PostsList.tsx    # Список постов
│   └── ...
├── lib/                 # Утилиты
│   ├── api.ts          # API клиент
│   └── utils.ts        # Общие утилиты
└── types/              # TypeScript типы
    └── post.ts         # Типы постов
```

## 🎨 Кастомизация

### Темы
Редактируйте CSS переменные в `src/styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  /* ... */
}
```

### Компоненты
Все shadcn/ui компоненты находятся в `src/components/ui/` и могут быть кастомизированы. 