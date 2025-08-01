# Changelog

Все важные изменения в этом проекте будут документированы в этом файле.

## [0.8.0] - 26.07.2025

### 📖 **MAJOR: Трёхколоночный layout для полных постов**
- ✅ **Сайдбар с автором**: Добавлен левый сайдбар с информацией об авторе и датой публикации
- 🗂️ **Навигация по категориям**: Отображение всех категорий с выделением текущей
- 🏷️ **Теги с активными ссылками**: Популярные теги с выделением текущих тегов поста
- 📚 **TOC система**: Правый сайдбар с автоматическим оглавлением для заголовков H1 и H2
- 🎯 **Активная навигация**: Подсветка текущего раздела при прокрутке страницы
- 🔄 **Smooth scroll**: Плавная прокрутка при клике на заголовок в TOC

### 🎨 **UI/UX улучшения**
- 📱 **Responsive дизайн**: Трёхколоночный layout на десктопе, вертикальные колонки на мобильных
- 📍 **Sticky позиционирование**: Сайдбары остаются на экране при прокрутке
- 🎯 **Пропорции layout**: Оптимальное соотношение 3-6-3 (sidebar-content-toc)
- 🖼️ **Исправление обложек**: Корректное отображение обложек постов в админ-панели

### 🔧 **Технические исправления**
- 🔑 **Уникальные ключи**: Исправлена проблема с дублированными ключами в PostTOC
- 🖼️ **URL изображений**: Добавлены хелпер функции для корректных URL обложек в админке
- 📦 **Fallback логика**: Автоматическое переключение между портами 3000/3001 для изображений
- 🧹 **Линтинг**: Проведён полный линтинг проекта с исправлением всех предупреждений

### 🛠️ **Backend/Frontend изменения**
- 🆕 **PostSidebar компонент**: Новый компонент для отображения автора и навигации
- 🆕 **PostTOC компонент**: Компонент автоматического оглавления с активной навигацией
- 🔄 **Функции getAllCategories/getAllTags**: Новые функции для получения всех категорий и тегов
- 🎯 **Улучшенный парсинг**: Парсинг заголовков из markdown для TOC
- 📱 **Mobile-first**: Адаптивная вёрстка для всех размеров экранов

### 📋 **Качество кода**
- ✅ **TypeScript**: Полная типизация новых компонентов и функций
- 🧹 **ESLint**: Устранение всех предупреждений линтера
- 📦 **Версии**: Обновление всех package.json до версии 0.8.0
- 🔧 **Структура lockfiles**: Оптимизация структуры package-lock.json для монорепозитория

## [0.7.0] - 25.07.2025

### 📅 **MAJOR: Поле даты и хронологическая сортировка**
- ✅ **Поле даты в форме**: Добавлено поле даты публикации в редактор постов
- 📅 **Автоматическая дата**: При создании поста автоматически устанавливается сегодняшняя дата
- 🎯 **Редактирование даты**: Пользователь может изменить дату на любую
- 📊 **Хронологическая сортировка**: Посты отображаются в порядке от новых к старым
- 🗓️ **UI с иконкой календаря**: Поле даты с красивой иконкой и описанием

### 🔧 **Технические улучшения**
- 📦 **Расширена схема данных**: Добавлено поле `date` во все типы Post и PostFormInput
- 🔗 **Новый API endpoint**: Создан `/posts/form` для создания постов из формы админки
- 🧩 **TypeScript типы**: Полная типизация для поля date
- 🔄 **Валидация**: Обязательное поле даты с проверкой формата
- 📄 **MDX интеграция**: Сохранение даты в frontmatter MDX файлов

### 🛠️ **Backend изменения**
- 🆕 **createPostFromForm**: Новая функция для создания постов из данных формы
- 🔍 **Парсинг метаданных**: Извлечение даты из MDX frontmatter
- 📊 **Сортировка по дате**: Автоматическая сортировка постов по дате (новые сначала)
- 🎯 **Валидация**: Проверка корректности даты при сохранении

### 🎨 **UI/UX улучшения**
- 📅 **Поле с иконкой**: Поле даты с иконкой календаря и описанием
- 🎯 **Сетка 3 колонки**: Автор | Дата | Теги в форме постов
- 💡 **Интуитивность**: Автоматическая установка сегодняшней даты
- 🔄 **Гибкость**: Возможность изменить дату на любую

### 🎯 **Frontend изменения**
- 📊 **Сортировка по дате**: Посты на сайте отображаются от новых к старым
- 🔄 **Автоматическое обновление**: Сортировка работает в реальном времени
- 📱 **Responsive дизайн**: Поле даты корректно отображается на всех устройствах

### 📋 **Migration**
- ✅ **Обратная совместимость**: Существующие посты продолжают работать
- 🔄 **Автоматическая дата**: Старые посты получают текущую дату при редактировании
- 🛡️ **Безопасность**: Никаких breaking changes для пользователей

## [0.6.0] - 25.07.2025

### 🖼️ **MAJOR: Система обложек для постов**
- ✅ **Загрузка обложек**: Добавлено поле для загрузки обложки постов в админ-панели
- 🖼️ **Превью в карточках**: Обложки отображаются в карточках постов с размерами 320x180px
- 📱 **Адаптивное отображение**: Обложки корректно отображаются на всех устройствах
- 🎯 **Оптимизация изображений**: Использование Next.js Image компонента с lazy loading
- 🔄 **Синхронизация**: Обложки сохраняются в MDX frontmatter и синхронизируются между админкой и фронтендом

### 🎨 **UI/UX улучшения**
- 📝 **Поле загрузки**: Интуитивное поле с кнопкой загрузки и превью
- 🗑️ **Удаление обложки**: Возможность удалить обложку одним кликом
- 📏 **Правильные размеры**: Обложки обрезаются по центру до размеров 320x180px
- 🎯 **Отсутствие в полном посте**: Обложки отображаются только в карточках, не в полном посте

### 🔧 **Технические улучшения**
- 📦 **Расширена схема данных**: Добавлено поле `coverImage` во все типы Post
- 🔗 **API обновления**: Поддержка загрузки и сохранения обложек
- 🧩 **TypeScript типы**: Полная типизация для поля coverImage
- 🔄 **Валидация**: Проверка размера файлов (до 1MB) и типа изображений
- 📄 **MDX интеграция**: Сохранение coverImage в frontmatter

### 🛠️ **Backend изменения**
- 📁 **Загрузка файлов**: Использование существующего API `/api/uploads/image`
- 🔍 **Парсинг метаданных**: Извлечение coverImage из MDX frontmatter
- 🎯 **Валидация**: Проверка типов файлов и размеров на сервере
- 📂 **Хранение**: Сохранение изображений в папку `/uploads/`

### 🎯 **Frontend изменения**
- 🖼️ **Next.js Image**: Оптимизированные изображения с правильными размерами
- 📱 **Responsive дизайн**: Адаптивное отображение обложек в карточках
- 🔗 **URL обработка**: Правильная обработка путей к изображениям
- ⚡ **Lazy loading**: Автоматическая оптимизация загрузки изображений

### 📋 **Migration**
- ✅ **Обратная совместимость**: Существующие посты продолжают работать
- 🔄 **Постепенное обновление**: Обложки добавляются по мере необходимости
- 🛡️ **Безопасность**: Никаких breaking changes для пользователей

## [0.5.1] - 24.07.2025

### 🔧 **PATCH: Исправление проблемы редактирования постов**
- ✅ **Сохранение типа редактора**: Добавлено поле `editorType` в схему постов
- 🔄 **Автоматический выбор редактора**: При редактировании пост открывается в том же редакторе, в котором был создан
- 💾 **Запоминание выбора**: Система помнит, в каком редакторе (Markdown/TipTap/Blocks) был создан каждый пост
- 🛡️ **Предотвращение потери данных**: Исправлена проблема сброса данных при переключении между редакторами
- 🎯 **Правильный workflow**: Теперь нет потери контента при редактировании существующих постов

### 🔧 **Технические улучшения**
- 📦 **Расширена схема данных**: `editorType: 'markdown' | 'tiptap' | 'blocks'` добавлено в Post и PostFormValues
- 🔗 **Обновлен API**: Поддержка сохранения типа редактора в frontmatter MDX файлов
- 🧩 **Улучшена типизация**: TypeScript типы обновлены для новых полей
- 🔄 **Обратная совместимость**: Старые посты автоматически получают тип 'markdown'

### 🛠️ **Backend изменения**
- 📄 **Frontmatter поддержка**: Сохранение `editorType` в метаданных MDX файлов
- 🔍 **Парсинг улучшен**: Извлечение типа редактора при загрузке постов
- 🎯 **Валидация**: Проверка корректности типа редактора при сохранении

### 🎨 **UX улучшения**
- 📝 **Консистентность**: Редактирование постов теперь предсказуемо
- 🚫 **Устранены сбросы**: Больше нет неожиданной очистки контента
- 💡 **Интуитивность**: Система ведет себя так, как ожидает пользователь

### 📋 **Migration**
- ✅ **Автоматическая миграция**: Существующие посты продолжают работать
- 🔄 **Постепенное обновление**: При редактировании старых постов добавляется `editorType`
- 🛡️ **Безопасность**: Никаких breaking changes для пользователей

## [0.5.0] - 23.07.2025

### 🌙 **MAJOR: Полная поддержка темной темы**
- ✨ **Тёмная тема везде**: Frontend и админка полностью поддерживают dark mode
- 🎨 **next-themes интеграция**: Автоматическое определение системной темы
- 🔘 **ThemeToggle компонент**: Переключатель с иконками (солнце/луна/монитор)
- 🎯 **Правильные цвета**: Все UI компоненты адаптированы под тёмную тему
- 💾 **Сохранение настроек**: Тема сохраняется в localStorage
- 🔄 **Системная синхронизация**: Автоматическое переключение при изменении системной темы

### 📱 **MAJOR: Улучшенная адаптивность**
- 🖥️ **Полная ширина экрана**: Убраны ограничения max-width в админке
- 📐 **Responsive грид**: Правильные breakpoints для всех устройств
- 📱 **Мобильная оптимизация**: Улучшенный UX на телефонах и планшетах
- 🔧 **Автозакрытие сайдбара**: Сайдбар закрывается при переходах в мобильной версии
- 🎯 **Адаптивные размеры**: Иконки, текст и отступы масштабируются правильно
- 📊 **Гибкая сетка**: Dashboard карточки адаптируются от 1 до 4 колонок

### 🎨 **UI/UX улучшения**
- 🌈 **CSS переменные**: Переход на CSS кастомные свойства для тем
- 🔘 **Улучшенные кнопки**: Все варианты кнопок поддерживают тёмную тему
- 📝 **Формы в тёмной теме**: Все поля ввода, селекты и чекбоксы адаптированы
- 🎯 **Консистентный дизайн**: Единообразие между фронтендом и админкой
- ⚡ **Плавные переходы**: Анимации переключения темы
- 💫 **Современный вид**: Обновлённая цветовая палитра

### 🔧 **Технические улучшения**
- 🧹 **ESLint исправления**: 0 ошибок во всех частях проекта
- 📦 **TypeScript строгость**: Убраны все `any` типы в пользу строгой типизации
- 🎯 **ThemeProvider**: Кастомная реализация для админки без next-themes
- 🔄 **Context API**: Правильное управление состоянием темы
- 📱 **useIsMobile хук**: Определение мобильных устройств
- 🎨 **CSS оптимизация**: Убраны дублирующиеся стили

### 🛠️ **Исправления**
- 🔧 **Layout constraints**: Убраны жёсткие ограничения ширины (max-w-7xl)
- 📱 **Mobile sidebar**: Автоматическое закрытие при навигации
- 🎨 **Button colors**: Исправлены цвета кнопок в тёмной теме
- 📊 **Dashboard overflow**: Устранён горизонтальный скролл
- 🔘 **Form elements**: Все элементы форм корректно работают в тёмной теме
- ⚠️ **Theme toggle conflict**: Устранён конфликт между theme провайдерами

### 📦 **Dependencies**
- ✅ **next-themes**: Добавлена только во фронтенд
- 🧹 **package.json cleanup**: Удалены неиспользуемые зависимости из админки
- 📚 **TypeScript types**: Правильные типы для next-themes

### 🎯 **Breaking Changes**
- ⚠️ **Theme structure**: Изменена структура CSS переменных для тем
- 🔄 **Provider changes**: Новая архитектура ThemeProvider в админке

### 🚀 **Performance**
- ⚡ **Lazy loading**: Компоненты темы загружаются по требованию
- 💾 **localStorage**: Оптимизированное сохранение настроек темы
- 🎨 **CSS variables**: Более быстрое переключение тем

## [0.4.1] - 23.07.2025

### Fixed
- 🛠️ **Markdown редактор**: Заменен самодельный парсер на библиотеку `marked` в админке
- 🎨 **Preview стили**: Исправлены большие отступы между блоками, добавлены оптимальные spacing
- 🔧 **Code блоки**: Улучшена контрастность - темный текст на светлом фоне для лучшей читаемости
- 🔄 **Синхронизация**: Унифицирован рендеринг markdown между админкой и фронтендом
- ✅ **Поддержка markdown**: Полная поддержка всех элементов - code blocks (```bash), жирный шрифт (**MAJOR**), inline code (`/package.json`)

### Technical
- 📦 Установлена библиотека `marked` и `@types/marked` в админку
- 🎯 Добавлена директива `"use client"` в BlockRenderer для Next.js совместимости  
- 📐 Обновлены prose стили с увеличенными отступами (mb-6) для лучшей читаемости
- 🖤 Улучшены цвета code элементов: `bg-slate-100 text-slate-800` (светлая тема) и `bg-slate-800 text-slate-100` (темная тема)

Формат основан на [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 23.07.2025

### 🏷️ **Теги и Категории**
- ✅ **ИСПРАВЛЕНО:** Поле ввода тегов в админке - теперь можно вводить пробелы и запятые
- ✅ **НОВОЕ:** Мульти-выбор тегов на фронтенде - можно выбирать несколько тегов одновременно
- ✅ **НОВОЕ:** Полная система категорий с возможностью создания, редактирования и удаления
- ✅ **НОВОЕ:** Управление категориями в настройках админки (вкладка "Посты")
- ✅ **НОВОЕ:** Фильтрация по категориям на фронтенде с отдельным блоком фильтров
- ✅ **НОВОЕ:** Отображение категорий в карточках постов и на страницах постов
- ✅ **НОВОЕ:** Динамическая загрузка категорий из настроек (убран статический список)

### 🎨 **UI/UX улучшения**
- ✅ **Улучшен интерфейс** фильтров - теги и категории в отдельных блоках
- ✅ **Добавлены иконки** для визуального различия: 📁 для категорий, # для тегов
- ✅ **Переупорядочены настройки** - управление категориями теперь выше настроек отображения
- ✅ **Добавлены бейджи** с визуальным различием для категорий (primary) и тегов (secondary)
- ✅ **Улучшена навигация** - клик по категории/тегу ведет к соответствующей фильтрации

### 🔧 **Технические улучшения**
- ✅ **Обновлены API** для поддержки категорий в настройках
- ✅ **Расширены схемы валидации** для категорий на backend и frontend
- ✅ **Оптимизирована логика** фильтрации с поддержкой множественных тегов и категорий
- ✅ **Улучшена типизация** TypeScript для всех новых функций

### 🛠️ **Backend изменения**
- ✅ **Добавлены настройки категорий** в settings.json
- ✅ **Обновлены API endpoints** для сохранения категорий
- ✅ **Добавлена валидация** категорий (максимум 50, проверка дубликатов)
- ✅ **Расширена поддержка** множественной фильтрации в MDX парсере

## [0.3.0] - 22.07.2025

### 🎨 **UI/UX улучшения**
- ✅ **Исправлены размеры кнопок** в HERO блоке на главной странице
- ✅ **Оптимизированы кнопки** "Исследовать контент" и "Админ-панель"
- ✅ **Улучшен footer** с корректными стилями для белой кнопки
- ✅ **Добавлена ссылка на GitHub** в footer с иконкой
- ✅ **Добавлена ссылка на Fubon** в footer с переходом в новом окне
- ✅ **Обновлен список технологий** с добавлением Vite.js

### 🔧 **Технические исправления**
- ✅ **Исправлена белая кнопка** с белым текстом в footer
- ✅ **Добавлен Vite.js** в секцию "Построено на лучших технологиях"
- ✅ **Улучшена типографика** футера с правильными hover эффектами
- ✅ **Оптимизированы размеры** кнопок HERO блока до стандартных shadcn/ui

### 📱 **Дизайн улучшения**
- ✅ **Footer дизайн** обновлен с горизонтальным расположением элементов
- ✅ **GitHub интеграция** с прямой ссылкой на репозиторий
- ✅ **Брендинг Fubon** с официальной ссылкой на сайт
- ✅ **Vite.js карточка** с соответствующей иконкой и описанием

## [0.2.0] - 22.07.2025

### 🔥 **MAJOR: Блочный редактор контента** (v0.3.0)
- ⚡ **Революционное изменение**: Полностью переписан контент-редактор с текстового на блочный
- 🧩 **5 типов блоков**: Markdown, Button, Heading (H1-H6), Image, Spacer
- 🏗️ **Архитектура блоков**: JSON структура с id, type, width, order для каждого блока
- 📐 **Настройки ширины**: `fullsize` (во всю ширину) и `container` (ограниченная max-w-4xl)
- 🎛️ **Индивидуальные настройки**: Каждый блок имеет собственную панель настроек
- 📦 **Сериализация**: Автоматическое сохранение в JSON формате
- ↩️ **Обратная совместимость**: Поддержка старого markdown контента

### 📷 **Система загрузки изображений**
- 🖼️ **Image блоки**: Встроенная поддержка изображений в редакторе
- 📁 **Загрузка файлов**: Ограничение 1MB, сохранение в `frontend/public/uploads`
- 🔗 **API endpoints**: `POST /api/uploads/image` с валидацией типов и размера
- 👀 **Предпросмотр**: Отображение изображений в админке и на фронтенде
- 🔄 **Синхронизация**: Автоматическая синхронизация между админкой и фронтендом
- 🏷️ **Метаданные**: Поддержка alt-текста и подписей к изображениям

### 🎨 **Продвинутая система стилей**
- 🔧 **clsx + tailwind-merge**: Умное объединение CSS классов без конфликтов
- 🔘 **Расширенные кнопки**: Добавлены варианты `ghost` и `link` 
- 🎯 **Hover исправления**: Устранены проблемы с hover вне области кнопок
- 🚫 **Изоляция стилей**: `prose` классы не влияют на UI компоненты
- 📝 **Tailwind Typography**: Корректная типографика только для markdown блоков

### 🌐 **Динамические SEO метаданные**
- 📄 **generateMetadata**: Уникальные title и description для каждого поста
- 🏗️ **generateStaticParams**: Предгенерация всех постов для SSG
- 🎯 **Динамические заголовки**: Автоматическое извлечение из контента поста
- ⚡ **Статическая генерация**: Оптимальная производительность после сборки

### 🔤 **Улучшенная генерация Slug**
- 🌍 **Транслитерация**: Полная поддержка русских символов
- 📝 **"Привет мир" → "privet-mir"**: Корректное преобразование кириллицы
- 🔘 **Кнопка генерации**: "Сгенерировать URL" рядом с полем slug
- ⚡ **Автоматизация**: Авто-генерация при вводе заголовка для новых постов
- 🔧 **Улучшенный алгоритм**: Удаление спецсимволов, множественных дефисов

### 🖥️ **UX/UI улучшения**
- 🖼️ **Fullscreen исправления**: Корректное управление scroll при открытии/закрытии
- 📍 **Dropdown позиционирование**: Все меню выравниваются по левому краю
- 🎨 **Визуальные улучшения**: Лучшие hover эффекты и переходы
- 📱 **Адаптивность**: Улучшенная работа на мобильных устройствах

### 🔧 **Техническое совершенство**
- 📏 **TypeScript**: Строгая типизация для всех блоков и компонентов
- 🧹 **ESLint**: Настройка TypeScript правил, исправление всех ошибок
- 🔍 **Линтер**: 0 ошибок, 0 предупреждений в продакшн коде
- ⚡ **Оптимизация**: Улучшенная производительность рендеринга блоков

### 🔄 **Система рендеринга блоков**
- 🧱 **BlockRenderer**: Универсальный компонент для отображения всех типов блоков
- 🎨 **Стилизация**: Правильное применение container/fullsize ширины
- 📝 **Markdown**: Встроенный парсер для отображения markdown блоков
- 🔘 **Button компоненты**: Shadcn UI кнопки с поддержкой всех вариантов
- 🖼️ **Next.js Image**: Оптимизированные изображения с lazy loading

### 📦 **Backend расширения**
- 📁 **Multipart uploads**: `@fastify/multipart` для загрузки файлов
- 🔒 **Валидация**: Проверка типов файлов и размеров
- 📂 **Static файлы**: Автоматическая раздача из `/uploads/`
- 🌐 **CORS обновления**: Поддержка дополнительных портов для разработки

### 🗑️ **Removed**
- ❌ **Simple Preview**: Удален режим предпросмотра из редактора
- ❌ **Split режим**: Убран раздельный вид редактор/превью
- ❌ **MDX компоненты**: Удалены неиспользуемые CustomComponents и MDXContent
- 🧹 **Код очистка**: Упрощена архитектура рендеринга

### 🔄 **Migration Guide**
```javascript
// Старый формат (строка)
content: "# Заголовок\n\nТекст поста..."

// Новый формат (JSON блоки)
content: JSON.stringify({
  blocks: [
    { id: "1", type: "heading", level: 1, content: "Заголовок", width: "container", order: 0 },
    { id: "2", type: "markdown", content: "Текст поста...", width: "container", order: 1 }
  ],
  version: "1.0"
})
```

### 📊 **Impact**
- 🚀 **Производительность**: Оптимизированный рендеринг и меньше кода
- 🎨 **Гибкость**: Создание сложных layout с разными типами контента
- 👨‍💻 **DX**: Улучшенный опыт разработчика с типизацией и линтером
- 👤 **UX**: Интуитивный блочный редактор вместо plain-text
- 🌍 **Локализация**: Полная поддержка русского языка в URL

### 🎯 **Breaking Changes**
⚠️ **Формат контента**: Старый markdown-контент поддерживается, но новый сохраняется в JSON
⚠️ **API**: Изменена структура данных постов (поле `content` теперь JSON строка)

## [0.1.9] - 22.07.2025

### Fixed
- 📝 **Склонения в русском языке** - Исправлены неправильные склонения слов "тег" и "пост"
- 🔤 **"2 тегов" → "2 тега"** - Теперь правильные формы: 1 тег, 2 тега, 5 тегов
- 🔤 **"2 постов" → "2 поста"** - Правильные формы: 1 пост, 2 поста, 5 постов

### Added
- 🛠️ **Функция pluralize** - Универсальная функция для склонения в русском языке
- 📊 **Функция formatCount** - Форматирование "количество + слово" с правильным склонением
- 🎯 **Поддержка особых случаев** - Правильная обработка чисел 11-14 (всегда множественное число)

### Technical Details
**Алгоритм склонения**:
```javascript
pluralize(count, ['тег', 'тега', 'тегов'])
// 1, 21, 31, 41... → "тег"    (единственное число)
// 2, 3, 4, 22, 23, 24... → "тега"   (2-4)
// 0, 5-20, 25-30... → "тегов"  (множественное число)
// 11-14 → "тегов" (особый случай)
```

**Применено в файлах**:
- `frontend/app/posts/[slug]/page.tsx` - счетчик тегов
- `frontend/components/posts/PostsList.tsx` - счетчик тегов 
- `admin/src/routes/PostsList.tsx` - счетчик постов
- `admin/src/routes/Dashboard.tsx` - статистика постов
- `admin/src/components/settings/PostSettings.tsx` - настройки постов

### Impact
- ✅ Весь интерфейс теперь использует правильный русский язык
- ✅ Улучшен пользовательский опыт для русскоязычных пользователей
- ✅ Устранены грамматические ошибки в UI

## [0.1.8] - 22.07.2025

### Added
- 🎨 **Safelist в Tailwind Admin**: Добавлены 200+ предустановленных классов для редактора
- ⚡ **Pattern matching**: Динамическое распознавание responsive классов через regex
- 🌈 **Полная поддержка градиентов**: Все градиенты Tailwind CSS теперь работают в Simple Preview
- 📱 **Responsive классы**: Поддержка sm:, md:, lg:, xl:, 2xl: префиксов
- 🎯 **200+ классов**: Цвета, отступы, typography, layout, borders, shadows

### Fixed
- 🚨 **Simple Preview Tailwind**: Теперь корректно отображает ВСЕ Tailwind CSS классы
- 🔧 **Нативный рендеринг**: Убраны inline стили, используется настоящий Tailwind CSS
- 🎨 **Градиенты в админке**: `bg-gradient-to-r from-purple-400 to-pink-400` теперь работает
- 📐 **Layout классы**: `flex`, `inline-flex`, `grid`, `items-center` корректно применяются

### Removed
- ❌ **Inline стили хаки**: Убраны временные inline стили для div и button элементов
- 🧹 **Костыли**: Удален сложный код преобразования классов в inline стили

### Technical Details
**Проблема**: Tailwind в админке не видел динамические классы из редактора, поэтому они не включались в финальный CSS.

**Решение**: Добавлен `safelist` в `admin/tailwind.config.js`:
```javascript
safelist: [
  // 200+ классов для редактора
  'bg-blue-500', 'bg-gradient-to-r', 'from-purple-400', 'to-pink-400',
  'p-1', 'p-2', ..., 'p-10', 'text-white', 'font-bold', 'rounded-lg',
  // Pattern для responsive
  { pattern: /(sm|md|lg|xl|2xl):(bg|text|p|m|w|h|flex|grid|border|rounded)-.+/ }
]
```

### Impact
- ✅ Simple Preview = точная копия настоящего Tailwind CSS
- ✅ Любые цвета, градиенты, отступы работают "из коробки"
- ✅ Responsive дизайн поддерживается полностью
- ✅ Больше никаких хаков или inline стилей

## [0.1.7] - 22.07.2025

### Fixed
- 🚨 **КРИТИЧЕСКОЕ: Парсинг CSS классов** - Исправлена потеря атрибутов на frontend
- 🔧 **Regex парсинг атрибутов** - Правильная обработка значений в кавычках
- 🎯 **Сохранение всех классов** - `class="bg-blue-500 p-10 inline-flex text-white rounded-lg"` больше не обрезается

### Technical Details
**Проблема**: Простой `split(/\s+/)` разбивал строку атрибутов по пробелам внутри кавычек:
```javascript
// Неправильно
"bg-blue-500 p-10 inline-flex text-white rounded-lg".split(/\s+/)
// Результат: ["bg-blue-500", "p-10", "inline-flex", "text-white", "rounded-lg"]
```

**Решение**: Regex парсинг с поддержкой кавычек:
```javascript
// Правильно
const regex = /(\w+)=["']([^"']*)["']/g;
// Результат: class = "bg-blue-500 p-10 inline-flex text-white rounded-lg"
```

### Impact
- ✅ Все Tailwind CSS классы корректно работают на продакшене
- ✅ Div блоки и кнопки отображаются как задумано
- ✅ Соответствие между админкой и frontend

## [0.1.6] - 22.07.2025

### Fixed
- 🎨 **Simple Preview Tailwind поддержка** - Добавлены inline стили для Tailwind CSS классов
- 📐 **Grid Layout редактора** - Исправлено растяжение секций по высоте в Split режиме
- 🔧 **Адаптивность высоты** - Левая и правая панели теперь всегда одинаковой высоты

### Added
- 🎨 **Поддержка цветов** - `bg-blue-500`, `bg-red-500`, `bg-green-500`, `bg-purple-400`, `bg-pink-400`
- 🌈 **Градиенты** - `bg-gradient-to-r from-purple-400 to-pink-400`
- 📏 **Отступы** - `p-8`, `p-10`
- 🔤 **Текстовые стили** - `text-white`, `text-center`, `font-bold`
- 📦 **Display стили** - `inline-flex`
- 🔘 **Border radius** - `rounded-lg`, `rounded-xl`

### Improved
- 📐 **Grid структура** - `grid-rows-[auto_1fr]` для правильного растяжения
- 📏 **Высота компонентов** - `h-full` вместо фиксированных высот
- 🎯 **Fullscreen режим** - Тот же улучшенный grid layout
- 📱 **Минимальная высота** - `min-h-[500px]` для комфортной работы

## [0.1.5] - 22.07.2025

### Added
- 🎯 **Frontend MDX рендеринг** - Полная поддержка HTML-like компонентов на продакшене
- 🔧 **MDXContent компонент** - Безопасный парсинг вместо dangerouslySetInnerHTML
- ⚛️ **CustomComponents** - Shadcn UI кнопки с поддержкой всех атрибутов
- 🎨 **Tailwind CSS 4.1** - Использует @plugin "@tailwindcss/typography" синтаксис
- 📝 **Prose классы** - Автоматическое применение typography стилей

### Fixed
- 🔘 **Кнопки на продакшене** - Теперь корректно рендерятся как shadcn компоненты
- 📦 **Div блоки** - Полная поддержка Tailwind CSS классов на frontend
- 🔧 **Regex совместимость** - Исправлены проблемы с ES2018 флагами
- 🏷️ **Атрибуты парсинг** - Упрощенный и надежный парсинг HTML атрибутов

### Components Support
- `<button variant="outline" size="lg" href="#" class="bg-blue-500">Кнопка</button>`
- `<div class="bg-gradient-to-r from-purple-400 to-pink-400 p-8">Блок</div>`
- Все Tailwind CSS классы (gradients, colors, spacing, transitions, etc.)

## [0.1.4] - 22.07.2025

### Added
- 📡 **Динамическая проверка статуса Backend** - Автоматическая проверка доступности API
- 🔄 **useServerStatus Hook** - Отслеживание состояния backend с таймаутами
- 🎯 **Индикаторы состояния** - Зеленый/красный/желтый статус в header админки
- 💬 **Tooltip с деталями** - Информация о последней проверке и ошибках
- 🚀 **Продакшн готовность** - Автоматическое определение URL backend

### Fixed
- 🔍 **Header компонент** - Реальный статус вместо всегда "Сервер активен"
- ⏱️ **Timeout protection** - 5-секундный таймаут для API запросов
- ⚠️ **Error handling** - Корректная обработка сетевых ошибок

## [0.1.3] - 22.07.2025

### Fixed
- 🖥️ **Исправлен iframe режим** - теперь показывает конкретную редактируемую страницу
- 📜 **Убран двойной скролл** в Frontend Preview режиме
- 🎯 **Убран лишний параметр** `?preview=true` из URL iframe

### Added  
- 🎨 **ContentRenderer компонент** - React-based рендеринг вместо HTML строк
- 🔘 **Реальные shadcn кнопки** в Simple режиме вместо текста
- 🎨 **Полная поддержка Tailwind CSS** в Simple режиме (`bg-slate-100`, `text-center`, etc.)
- 📦 **Обработка HTML элементов** - `<div class="...">` рендерятся с правильными стилями
- 🔄 **Парсинг атрибутов** HTML в React props

### Changed
- 🚀 **Полная переработка Simple режима** - теперь использует React компоненты
- 🎭 **Улучшенное отображение компонентов** - кнопки выглядят как на проде
- ⚡ **Лучшая производительность** благодаря типизированным компонентам

## [0.1.2] - 21.07.2025

### Added
- ✨ **Расширенный редактор контента** с 3 новыми режимами отображения
- 🔤 **Кнопка "Код"** - увеличенный редактор (600px) для удобного редактирования
- 🔍 **Кнопка "Развернуть"** - полноэкранный редактор в модальном окне
- ⚡ **Кнопка "Сплит"** - разделение экрана с Live Preview Markdown
- 👀 **Live Preview** - мгновенный предварительный просмотр Markdown в реальном времени
- 🎨 **Интуитивные иконки** для всех режимов редактора
- 📱 **Адаптивный дизайн** для всех режимов отображения

### Changed
- 🔧 **Обновлен PostForm** для использования нового ContentEditor компонента
- 📝 **Улучшен UX редактирования** с визуальной обратной связью
- ⚙️ **Оптимизированы размеры** редактора для разных режимов

### Technical
- 📄 **Новый компонент** `admin/src/components/forms/ContentEditor.tsx`
- 🎛️ **Состояния редактора** `normal | code | fullscreen | split`
- 🖼️ **Sheet компонент** для полноэкранного режима
- 📋 **Markdown парсер** для базового рендеринга в Live Preview

## [0.1.1] - 21.07.2025

### Fixed
- 🔧 **Исправлены все ошибки ESLint** в frontend проекте
- 🧹 **Удалены неиспользуемые импорты** в admin hooks (Post, Settings, Link)
- 🛠️ **Исправлены TypeScript ошибки** в backend routes (return statements)
- ⚙️ **Оптимизирована настройка ESLint** для совместимости с проектом
- 🎯 **Код готов к продакшну** - все статические анализаторы проходят без ошибок

## [0.1.0] - 21.07.2025

### Added
- ⚙️ **Полноценная система настроек** в админ-панели с табами
- 🌐 **Общие настройки** - название сайта и описание для SEO
- 📄 **Настройки постов** - количество постов на странице с предпросмотром
- 🏷️ **Динамические мета-теги** - обновляются из настроек автоматически
- 📊 **Умная пагинация** - использует настройку postsPerPage из админки
- 🔌 **API настроек** - RESTful endpoints с валидацией
- ⚡ **Кэширование** - оптимизация производительности на 5 минут

### Fixed
- 🔧 **Исправлены ошибки Next.js 15** с async searchParams и params
- 🎨 **Стили загружаются корректно** - Tailwind CSS v4 работает полностью
- ✅ **Все страницы отвечают 200 OK** - фронтенд полностью функционален
- 📝 **Обновлены метаданные** для правильного SEO
- 🔄 **Сохранена вся функциональность** - фильтрация, пагинация, дизайн

### Changed
- 🚀 **Миграция на Tailwind CSS v4** с улучшенной производительностью
- 🗑️ **Удален tailwind.config.js** - конфигурация теперь в CSS
- 📝 **Обновлен globals.css** с новым синтаксисом @import
- ⚡ **В 3 раза быстрее** компиляция и hot reload
- 🎯 **Все функции сохранены** - совместимость с shadcn/ui

## [0.0.3] - 20.07.2025

### Added
- 🔄 **Автосинхронизация** backend/content ↔ frontend/content
- 🏠 **Главная страница** с кнопкой "Посты" и современным дизайном
- 📋 **Список постов** с фильтрацией по тегам в сайдбаре
- 📄 **Пагинация** с сохранением фильтров в URL
- 📖 **Отдельные страницы постов** с полным контентом и типографикой
- ⚡ **Скрипт синхронизации** с отслеживанием изменений в режиме реального времени

### Fixed
- 🔧 **Исправлена ошибка валидации** "Expected string, received array"
- 🎯 **Разделены типы** для входных и выходных данных формы
- 📝 **Улучшена типизация** TypeScript во всех компонентах
- 🏷️ **Корректная обработка тегов** в формах создания/редактирования

## [0.0.2] - 20.07.2025

### Added
- 🔔 **Обновлены уведомления** с toast на современный Sonner
- ✏️ **Добавлено редактирование постов** через админку
- 🛡️ **Улучшена обработка ошибок** во всех формах
- 🎨 **Оптимизирован UI/UX** с красивыми анимациями
- 🔄 **Полный CRUD** для управления постами

## [0.0.1] - 20.07.2025

### Added
- 🚀 **Первоначальная версия** PXLR CMS
- 📝 **Полноценная форма** создания постов с валидацией (zod + react-hook-form)
- 🔗 **Автогенерация slug** из заголовка
- 📄 **Markdown редактор** для содержимого
- 📋 **Режим черновика** для неопубликованных постов
- 🏷️ **Теги и метаданные** (автор, описание)
- 👀 **Предпросмотр** постов на frontend
- 🎨 **shadcn/ui компоненты** для профессионального вида
- 📱 **Responsive дизайн** для всех устройств
- 🌙 **Темная тема** (готовность к расширению)
- 🔧 **CRUD операции** для постов (создание, чтение, обновление, удаление)
- 📋 **Список всех постов** с поиском и фильтрацией

---

## Типы изменений

- `Added` для новых функций
- `Changed` для изменений в существующих функциях  
- `Deprecated` для функций, которые скоро будут удалены
- `Removed` для удаленных функций
- `Fixed` для исправлений ошибок
- `Security` для уязвимостей безопасности 