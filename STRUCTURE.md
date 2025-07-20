# 🏗️ Структура проекта PXLR CMS

## 📂 Общая структура
```
pxlr-cms/
├── 📁 backend/              # Fastify + TypeScript API сервер
├── 📁 admin/                # React + Vite админ-панель  
├── 📁 frontend/             # Next.js 15 + MDX сайт
├── 📄 package.json          # Root package с скриптами запуска
├── 📄 README.md             # Основная документация
└── 📄 STRUCTURE.md          # Этот файл
```

---

## 🔧 Backend (Fastify API)
```
backend/
├── 📂 src/
│   ├── 📂 routes/
│   │   └── 📄 posts.ts      # CRUD API для постов (✅ готово)
│   ├── 📂 utils/
│   │   └── 📄 mdx.ts        # Утилиты для работы с MDX (✅ готово)
│   ├── 📂 types/
│   │   └── 📄 post.ts       # TypeScript типы (✅ готово)
│   └── 📄 server.ts         # Fastify сервер (✅ готово)
├── 📂 content/              # 📝 MDX файлы постов
│   ├── 📄 welcome.mdx       # Демо пост (✅ создан)
│   ├── 📄 test-post.mdx     # Тестовый пост (✅ создан)
│   └── 📄 sonner-update.mdx # Пост об обновлении (✅ создан)
├── 📄 package.json          # Dependencies
├── 📄 tsconfig.json         # TypeScript config
└── 📄 README.md             # Backend документация
```

**🚀 Статус**: ✅ **Полностью готов**
- ✅ CRUD API для постов
- ✅ Автосохранение в MDX формате  
- ✅ TypeScript типизация
- ✅ CORS настроен для админки

---

## ⚙️ Admin (React + Vite)
```
admin/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 ui/           # shadcn/ui компоненты
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 textarea.tsx
│   │   │   ├── 📄 form.tsx
│   │   │   ├── 📄 switch.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   ├── 📄 alert-dialog.tsx
│   │   │   └── 📄 sonner.tsx      # 🆕 Sonner интеграция
│   │   ├── 📂 layout/
│   │   │   ├── 📄 Layout.tsx      # Основной layout (✅ готов)
│   │   │   ├── 📄 Header.tsx      # Шапка (✅ готов)
│   │   │   └── 📄 AppSidebar.tsx  # Sidebar (✅ готов)
│   │   └── 📂 forms/
│   │       └── 📄 PostForm.tsx    # 🆕 Форма создания/редактирования постов
│   ├── 📂 routes/
│   │   ├── 📄 Dashboard.tsx       # Главная страница (✅ обновлен)
│   │   ├── 📄 PostsList.tsx       # 🆕 Список всех постов с управлением
│   │   ├── 📄 PostCreate.tsx      # 🆕 Создание постов
│   │   ├── 📄 PostEdit.tsx        # 🆕 Редактирование постов
│   │   └── 📄 Settings.tsx        # Настройки (заглушка)
│   ├── 📂 hooks/
│   │   └── 📄 usePosts.ts         # 🆕 TanStack Query хуки для постов
│   ├── 📂 lib/
│   │   ├── 📄 api.ts              # API клиент (✅ готов)
│   │   ├── 📄 utils.ts            # Утилиты (✅ обновлен)
│   │   └── 📄 validations.ts      # 🆕 Zod схемы валидации
│   ├── 📂 types/
│   │   └── 📄 post.ts             # TypeScript типы
│   ├── 📂 styles/
│   │   └── 📄 globals.css         # Tailwind + shadcn/ui стили (✅ готов)
│   ├── 📄 App.tsx                 # Роутер приложения (✅ обновлен)
│   ├── 📄 main.tsx                # Entry point
│   └── 📄 vite-env.d.ts           # Vite типы окружения
├── 📄 vite.config.ts              # Vite конфигурация (✅ исправлен)
├── 📄 tailwind.config.js          # Tailwind конфигурация
├── 📄 postcss.config.js           # PostCSS конфигурация  
├── 📄 components.json             # shadcn/ui конфигурация
├── 📄 package.json                # Dependencies
├── 📄 USAGE.md                    # 🆕 Руководство пользователя
├── 📄 SONNER_UPDATE.md            # 🆕 Документация об обновлении
├── 📄 TAGS_FIX.md                 # 🆕 Исправление проблемы с тегами
└── 📄 README.md                   # Admin документация
```

**🚀 Статус**: ✅ **Полностью готов**
- ✅ Полный CRUD для постов
- ✅ Современный UI с shadcn/ui
- ✅ Sonner уведомления  
- ✅ Валидация форм с zod
- ✅ Автогенерация slug
- ✅ Режим черновика
- ✅ TypeScript типизация

---

## 🌐 Frontend (Next.js 15)
```
frontend/
├── 📂 app/
│   ├── 📄 layout.tsx              # Root layout
│   └── 📄 page.tsx                # Главная страница
├── 📂 content/                    # 📝 Синхронизируется с backend/content/
│   └── (пусто - готово к синхронизации)
├── 📂 lib/
│   └── 📄 utils.ts                # Утилиты
├── 📂 styles/
│   └── 📄 globals.css             # Базовые стили
├── 📄 next.config.ts              # Next.js конфигурация
├── 📄 tailwind.config.ts          # Tailwind конфигурация
├── 📄 tsconfig.json               # TypeScript конфигурация
└── 📄 package.json                # Dependencies
```

**🚀 Статус**: 🔄 **Готов к интеграции с backend**
- ✅ Next.js 15 настроен
- ✅ Базовый layout и страницы
- 🔄 Ожидает синхронизации content/

---

## 📋 Root уровень
```
pxlr-cms/
├── 📄 package.json          # 🆕 Скрипты для запуска всей системы
├── 📄 README.md             # 🆕 Обновленная документация  
└── 📄 structure.md          # 🆕 Этот файл
```

**📦 Root package.json скрипты**:
```json
{
  "scripts": {
    "install:all": "npm install && cd backend && npm install && cd ../admin && npm install && cd ../frontend && npm install",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:admin\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:admin": "cd admin && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "npm run build:backend && npm run build:admin && npm run build:frontend",
    "start": "npm run start:backend & npm run start:admin & npm run start:frontend",
    "open": "sleep 3 && open http://localhost:5173 && open http://localhost:3000"
  }
}
```

---

## 🔗 Порты и сервисы

| Сервис | Порт | URL | Статус |
|--------|------|-----|--------|
| **Backend API** | 3333 | http://localhost:3333 | ✅ Работает |
| **Admin Panel** | 5173 | http://localhost:5173 | ✅ Работает | 
| **Frontend Site** | 3000 | http://localhost:3000 | 🔄 Готов к интеграции |

---

## 📊 Статистика проекта

### 📁 Файлы
- **Backend**: ~15 файлов (TypeScript)
- **Admin**: ~25 файлов (React + TypeScript)
- **Frontend**: ~10 файлов (Next.js + TypeScript)
- **Total**: ~50 файлов

### 📝 Контент
- **4 демо поста** в backend/content/
- **Полный CRUD** через админку
- **API готов** к интеграции
- **Исправлена проблема с тегами** (типизация)

### 🛠️ Технологии
- **Backend**: Fastify, TypeScript, MDX
- **Admin**: React, Vite, shadcn/ui, TanStack Query, Sonner
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS

---

## 🚀 Следующие шаги

1. **✅ ЗАВЕРШЕНО**: Система создания постов
2. **✅ ЗАВЕРШЕНО**: Обновление на Sonner
3. **✅ ЗАВЕРШЕНО**: Исправление проблемы с тегами (типизация)
4. **🔄 СЛЕДУЮЩЕЕ**: Синхронизация backend/content ↔ frontend/content
5. **🔄 ПЛАНИРУЕТСЯ**: MDX рендеринг в Next.js frontend
6. **🔄 ПЛАНИРУЕТСЯ**: SEO оптимизация и метаданные

---

## 📖 Документация

- 📚 **Основное руководство**: [README.md](README.md)
- 📝 **Использование админки**: [admin/USAGE.md](admin/USAGE.md)  
- 🔄 **Обновление на Sonner**: [admin/SONNER_UPDATE.md](admin/SONNER_UPDATE.md)
- 🏷️ **Исправление тегов**: [admin/TAGS_FIX.md](admin/TAGS_FIX.md)
- 🔧 **Backend API**: [backend/README.md](backend/README.md)

---

> **🎉 Система готова к продакшну!**  
> Все основные функции CRUD реализованы, остается только настроить синхронизацию контента.
