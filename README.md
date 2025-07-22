# PXLR CMS v0.3.1

> 🚀 **Современная CMS система** построенная на **Fastify**, **React**, **Next.js 15**, **Tailwind CSS v4**, **TypeScript**, **Vite.js**, **shadcn/ui**

Полнофункциональная система управления контентом с мощным backend API, интуитивной админ-панелью и современным frontend сайтом.

<img width="1728" height="958" alt="cover" src="https://github.com/user-attachments/assets/462d3c2d-7f6f-40d3-bf10-f57f0de3d783" />

**Текущая версия:** `v0.3.0` | **Дата:** 22.07.2025 | **Релиз:** UI/UX Polish & GitHub Integration

[![Version](https://img.shields.io/badge/version-0.3.1-blue.svg)](https://github.com/fubon/pxlr-cms/releases/tag/v0.3.1)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 🌐 **DEMO**

- 🌍 **WEBSITE**: https://cms.pxlr.ru
- ⚙️ **ADMIN**: https://admin.pxlr.ru

## 🏗️ **Что это такое?**

PXLR CMS — это современная система управления контентом, состоящая из трех основных компонентов:

### 🔧 **Backend API (Fastify)**
- 🚀 **Высокопроизводительный API** на Node.js с типизацией TypeScript
- 📁 **Файловая система** для хранения контента в формате MDX
- 🔌 **RESTful API** для управления постами, настройками и загрузками
- 📷 **Загрузка изображений** с валидацией и оптимизацией

### ⚙️ **Админ-панель (React + Vite.js)**
- 📝 **Три типа редакторов**: Markdown, TipTap (WYSIWYG), Block Editor
- 🎨 **Современный UI** на shadcn/ui компонентах
- 📱 **Responsive дизайн** с поддержкой мобильных устройств
- 🔄 **Полноэкранный режим** для комфортной работы с контентом

### 🌐 **Frontend сайт (Next.js 15)**
- ⚡ **Статическая генерация** для максимальной производительности
- 🎨 **Современный дизайн** с Tailwind CSS v4
- 📖 **Динамические страницы** постов с SEO оптимизацией
- 🏷️ **Система тегов** и фильтрация контента

## 🛠️ **Технологический стек**

### Backend
- **Fastify** — быстрый веб-фреймворк для Node.js
- **TypeScript** — типизированный JavaScript
- **MDX** — Markdown с поддержкой React компонентов

### Admin панель  
- **React 19** — современная библиотека для UI
- **Vite.js** — сверхбыстрый сборщик
- **shadcn/ui** — готовые компоненты
- **TipTap** — редактор WYSIWYG
- **Tailwind CSS v4** — utility-first CSS

### Frontend
- **Next.js 15** — React фреймворк с App Router
- **TypeScript** — строгая типизация
- **Tailwind CSS v4** — современные стили
- **MDX** — рендеринг контента

## 🚀 Быстрый старт

### Установка зависимостей для всех проектов
```bash
npm run install:all
```

### Запуск в режиме разработки
```bash
npm run dev
```

Эта команда запустит:
- **Backend** на порту `3333` (Fastify API)
- **Admin панель** на порту `5173` (Vite + React)
- **Frontend** на порту `3000` (Next.js)
- Автоматически откроет браузер на `http://localhost:3000`

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

3. **Создание первого поста**:
   - Откройте http://localhost:5173 (админ-панель)
   - Нажмите "Создать пост"
   - Выберите один из 3 редакторов
   - Заполните форму и сохраните

4. **Просмотр результата**:
   - Откройте http://localhost:3000 (сайт)
   - Ваш пост появится в списке публикаций



## 📚 Документация

- 📝 **[CHANGELOG.md](CHANGELOG.md)** - История изменений
- 📖 **[admin/USAGE.md](admin/USAGE.md)** - Руководство пользователя
- 🔧 **[backend/README.md](backend/README.md)** - API документация

---

**Сделано в [Fubon](http://fubon.ru)** • **[GitHub](https://github.com/thefubon/pxlr-cms)** • **Лицензия MIT** 
