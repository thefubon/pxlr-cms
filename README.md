# PXLR CMS – Modern Headless CMS with Next.js

<img width="1605" height="863" alt="Cover" src="https://github.com/user-attachments/assets/cd99206a-26e9-498b-bbf5-7b09866fd165" />

Проект headless CMS на основе Next.js с monorepo структурой.

## Структура проекта

```
pxlr-cms/
├── frontend/          # Next.js приложение (порт 3000)
├── backend/           # headless CMS (порт 3333)
├── package.json       # Корневой package.json для управления workspace
└── pnpm-workspace.yaml # Конфигурация pnpm workspace
```

## Запуск проекта

### Из корня проекта:

```bash
# Запуск frontend и backend одновременно
pnpm dev

# Запуск только frontend
pnpm dev:frontend

# Запуск только backend (headless CMS)
pnpm dev:backend

# Альтернативный способ запуска всех сервисов
pnpm dev:all
```

### Порты:

- **Frontend (Next.js)**: http://localhost:3000
- **Backend (Headless CMS)**: http://localhost:3333

## Установка зависимостей

```bash
# Установка всех зависимостей в workspace
pnpm install

# Установка зависимостей только для frontend
pnpm --filter frontend install

# Установка зависимостей только для backend
pnpm --filter backend install
```

## Сборка проекта

```bash
# Сборка всех проектов
pnpm build

# Сборка только frontend
pnpm build:frontend

# Сборка только backend
pnpm build:backend
```

## Функциональность CMS

### 🎯 **Реализовано:**

- **Админка** - современный интерфейс управления
- **Dashboard со статистикой** - обзор контента, активность, метрики
- **Settings раздел** - управление Title и Description сайта
- **Posts Management** - полноценный редактор MDX постов с превью
- **Автоматическое обновление Next.js** - изменения в CMS сразу применяются к frontend
- **Файловая система** - хранение данных без базы данных
- **API для управления** - REST endpoints для всего контента
- **Автосохранение** - автоматическое сохранение при редактировании
- **Горячие клавиши** - быстрые команды для продуктивности
- **Live Preview** - превью Markdown в реальном времени

### 🔮 **Планируется:**

- **Pages Management** - управление статическими страницами
- **File Upload** - загрузка изображений и медиа
- **Drag & Drop** - перетаскивание файлов
- **Syntax Highlighting** - подсветка синтаксиса в редакторе

## Статус проекта

✅ **Frontend**: Next.js на порту 3000  
✅ **Backend**: Headless CMS на порту 3333  
✅ **Settings**: Работает и синхронизируется с Next.js  
✅ **Posts**: Полнофункциональный редактор с автосохранением  
✅ **Dashboard**: Статистика и управление контентом  

## Горячие клавиши

| Клавиши | Действие |
|---------|----------|
| `Ctrl/Cmd + N` | Создать новый пост |
| `Ctrl/Cmd + S` | Сохранить пост (в редакторе) |
| `Ctrl/Cmd + P` | Переключить превью (в редакторе) |
| `Esc` | Закрыть модальное окно |

## Возможности админки

### 📊 **Dashboard**
- Статистика контента (количество постов, размер файлов)
- Недавняя активность
- Быстрые действия

### ✏️ **Редактор постов**
- Автогенерация slug из заголовка
- Live превью Markdown
- Автосохранение каждые 2 секунды
- Управление метаданными (title, description, date)

### ⚙️ **Настройки**
- Мгновенное обновление Next.js layout
- Управление title и description сайта

---

## 📚 **Документация**

- **[📝 CHANGELOG.md](./CHANGELOG.md)** - Полный журнал изменений и новых функций
- **[🚀 ADMIN_FEATURES.md](./ADMIN_FEATURES.md)** - Подробное руководство по всем возможностям админки

### 🎯 **Быстрый доступ к функциям:**
- [Библиотека компонентов](./ADMIN_FEATURES.md#библиотека-компонентов) - Hero, Card, Accordion, Tabs и др.
- [Поддержка Tailwind CSS](./ADMIN_FEATURES.md#поддержка-tailwind-css) - 200+ классов
- [Режимы редактора](./ADMIN_FEATURES.md#режимы-просмотра) - Editor/Preview переключение
- [Система дат](./ADMIN_FEATURES.md#система-дат-и-сортировки) - Управление порядком постов
- [Горячие клавиши](./ADMIN_FEATURES.md#горячие-клавиши) - Keyboard shortcuts 
