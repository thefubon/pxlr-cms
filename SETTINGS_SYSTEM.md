# ⚙️ Система настроек PXLR CMS

## 🎯 Описание

Система настроек позволяет управлять конфигурацией сайта через админ-панель с автоматическим применением изменений на фронтенде.

## 📋 Возможности

### 🌐 **Общие настройки**
- **Название сайта** - отображается в заголовке браузера и мета-тегах
- **Описание сайта** - используется для SEO и социальных сетей
- **Предпросмотр** поисковой выдачи в реальном времени

### 📝 **Настройки постов**
- **Количество постов на странице** (1-50) для пагинации
- **Предпросмотр пагинации** с текущими настройками
- **Рекомендации** по оптимальным значениям

## 🔧 Архитектура

### Backend (`backend/src/routes/settings.ts`)
```typescript
interface Settings {
  general: {
    siteTitle: string;
    siteDescription: string;
  };
  posts: {
    postsPerPage: number;
  };
}
```

**API Endpoints:**
- `GET /api/settings` - получить все настройки
- `PUT /api/settings` - обновить настройки  
- `GET /api/settings/general` - только общие настройки
- `GET /api/settings/posts` - только настройки постов

**Хранение:** Файл `backend/settings.json` (создается автоматически)

### Frontend (`frontend/lib/settings.ts`)
```typescript
// Кэширование настроек на 5 минут
export async function getSettings(): Promise<Settings>
export async function getGeneralSettings(): Promise<GeneralSettings>
export async function getPostSettings(): Promise<PostSettings>
```

**Интеграция:**
- ✅ **Layout** - динамические мета-теги из настроек
- ✅ **Posts** - количество постов на странице из настроек
- ✅ **Кэширование** - 5 минут для оптимизации производительности

### Admin (`admin/src/routes/Settings.tsx`)
- 🎨 **Табы** - переключение между разделами настроек
- 📝 **Формы** - валидация и автосохранение
- 🔄 **Реактивность** - мгновенный предпросмотр изменений

## 🚀 Использование

### В админ-панели
1. Перейдите в **Настройки** → **Общие**
2. Измените название и описание сайта
3. Посмотрите предпросмотр в поисковой выдаче
4. Нажмите **Сохранить изменения**

### Настройки постов
1. Перейдите в **Настройки** → **Посты**
2. Установите количество постов на странице (1-50)
3. Посмотрите предпросмотр пагинации
4. Сохраните изменения

### Для разработчиков

#### Использование настроек в компонентах:
```typescript
// В серверных компонентах
import { getSettings } from '@/lib/settings';

export default async function MyComponent() {
  const settings = await getSettings();
  return <div>{settings.general.siteTitle}</div>;
}
```

#### Добавление новых настроек:
1. Обновите интерфейс `Settings` в backend и frontend
2. Добавьте валидацию в API schema
3. Создайте UI форму в админке
4. Обновите дефолтные значения

## 📊 Дефолтные значения

```json
{
  "general": {
    "siteTitle": "PXLR CMS - Современная система управления контентом",
    "siteDescription": "Современная CMS с Fastify backend, React админ-панелью и Next.js фронтендом"
  },
  "posts": {
    "postsPerPage": 6
  }
}
```

## 🔄 Процесс работы

1. **Изменение в админке** → API запрос на backend
2. **Backend** → валидация + сохранение в `settings.json`
3. **Frontend** → загрузка настроек при рендере страниц
4. **Кэширование** → оптимизация повторных запросов

## ⚡ Производительность

- ✅ **Кэширование** настроек на 5 минут
- ✅ **Fallback** к дефолтным значениям при ошибках
- ✅ **Lazy loading** - настройки загружаются только при необходимости
- ✅ **Server-side** применение в мета-тегах и пагинации

## 🛠️ Расширение

### Добавление новой настройки:

1. **Backend** (`backend/src/routes/settings.ts`):
```typescript
interface Settings {
  general: { /* ... */ };
  posts: { /* ... */ };
  newSection: {
    newSetting: string;
  };
}
```

2. **Frontend** (`frontend/lib/settings.ts`):
```typescript
export interface NewSectionSettings {
  newSetting: string;
}
```

3. **Admin** - создать компонент настроек:
```typescript
export function NewSectionSettings() {
  // Форма с валидацией
}
```

4. **Добавить в табы** (`admin/src/routes/Settings.tsx`)

## 🔍 Мониторинг

### Логи backend:
```bash
# Просмотр логов настроек
tail -f backend/logs/app.log | grep settings
```

### Проверка API:
```bash
# Получить текущие настройки
curl http://localhost:3333/api/settings

# Обновить настройки
curl -X PUT http://localhost:3333/api/settings \
  -H "Content-Type: application/json" \
  -d '{"general":{"siteTitle":"Новое название"}}'
```

## 🎉 Преимущества

- ✅ **Без перезапуска** - изменения применяются мгновенно
- ✅ **Типобезопасность** - TypeScript валидация на всех уровнях
- ✅ **Предпросмотр** - видите результат до сохранения
- ✅ **Валидация** - защита от некорректных данных
- ✅ **Fallback** - система продолжает работать при ошибках
- ✅ **Кэширование** - оптимизированная производительность

> **🚀 Настройки интегрированы во всю систему и обеспечивают централизованное управление конфигурацией сайта!** 