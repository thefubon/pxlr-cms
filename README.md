# PXLR CMS - Современная система управления контентом

Полнофункциональная CMS с Fastify backend, React админ-панелью и Next.js фронтендом.


## 🌐 Доступ к сервисам

После запуска `npm run dev`:
- 🌍 **Сайт**: http://localhost:3000
- ⚙️ **Админ-панель**: http://localhost:5173
- 🔌 **API**: http://localhost:3333

## 📋 Доступные команды

### Разработка
- `npm run dev` - Запуск всех сервисов + открытие браузера
- `npm run dev:backend` - Только backend
- `npm run dev:admin` - Только админ-панель
- `npm run dev:frontend` - Только frontend

### Сборка
- `npm run build` - Сборка всех проектов
- `npm run build:backend` - Сборка backend
- `npm run build:admin` - Сборка админ-панели
- `npm run build:frontend` - Сборка frontend

### Продакшн
- `npm start` - Запуск всех сервисов в продакшн режиме

### Управление зависимостями
- `npm run install:all` - Установка зависимостей во всех проектах
- `npm run clean` - Очистка всех node_modules
- `npm run reset` - Полная переустановка зависимостей

## 🏗️ Структура проекта

```
project-root/
├── backend/        # Fastify API + .mdx файлы (порт 3333)
├── admin/          # Vite + React 19 админ-панель (порт 5173)
├── frontend/       # Next.js 15 сайт (порт 3000)
└── package.json    # Корневые скрипты управления
```

## 🔧 Настройка портов

- **Frontend**: `3000` (Next.js по умолчанию)
- **Backend**: `3333` (настраивается в backend конфигурации)
- **Admin**: `5173` (Vite по умолчанию)

## 🌐 Доступ к сервисам

После запуска `npm run dev`:
- 🌍 **Сайт**: http://localhost:3000
- ⚙️ **Админ-панель**: http://localhost:5173
- 🔌 **API**: http://localhost:3333

## 📋 Быстрый старт

1. **Установка зависимостей**:
   ```bash
   npm run install:all
   ```

2. **Запуск системы**:
   ```bash
   npm run dev
   ```

3. **Открытие в браузере**:
   - Сайт автоматически откроется в браузере
   - Или перейдите по ссылкам выше

## 🚀 Деплой в продакшн

Подробные инструкции по деплою см. в файле [`DEPLOYMENT.md`](./DEPLOYMENT.md).

### Краткий обзор:
- **Сайт**: https://pxlr.ru
- **Админ-панель**: https://admin.pxlr.ru  

## 🔧 Технологии

### Backend
- **Fastify** - Быстрый веб-фреймворк
- **TypeScript** - Типизированный JavaScript
- **MDX** - Markdown с JSX поддержкой

### Admin Panel
- **React 19** - Современный UI фреймворк
- **Vite** - Быстрый сборщик
- **shadcn/ui** - Компоненты UI
- **TanStack Query** - Управление состоянием

### Frontend
- **Next.js 15** - React фреймворк
- **Tailwind CSS** - Utility-first CSS
- **MDX** - Рендеринг контента

## 📝 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей. 
