import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3333;

// Rate limiting отключен для разработки
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });

// Middleware
// app.use(limiter); // отключено
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create data directories if they don't exist
const dataDir = path.join(__dirname, 'data');
const settingsFile = path.join(dataDir, 'settings.json');
const menuFile = path.join(dataDir, 'menu.json');
const pagesFile = path.join(dataDir, 'pages.json');
const postsDir = path.join(__dirname, '../frontend/src/content/posts');
const pagesDir = path.join(__dirname, '../frontend/src/content/pages');

await fs.ensureDir(dataDir);
await fs.ensureDir(postsDir);
await fs.ensureDir(pagesDir);

// Safe JSON operations to prevent corruption
async function safeReadJson(filePath, defaultValue = {}) {
  try {
    if (!await fs.pathExists(filePath)) {
      console.log(`📄 Creating missing file: ${path.basename(filePath)}`);
      await fs.writeJson(filePath, defaultValue, { spaces: 2 });
      return defaultValue;
    }
    
    const stats = await fs.stat(filePath);
    if (stats.size === 0) {
      console.log(`📄 Repairing empty file: ${path.basename(filePath)}`);
      await fs.writeJson(filePath, defaultValue, { spaces: 2 });
      return defaultValue;
    }
    
    const content = await fs.readFile(filePath, 'utf-8');
    if (!content.trim()) {
      console.log(`📄 Repairing blank file: ${path.basename(filePath)}`);
      await fs.writeJson(filePath, defaultValue, { spaces: 2 });
      return defaultValue;
    }
    
    return await fs.readJson(filePath);
  } catch (error) {
    console.error(`❌ Error reading ${path.basename(filePath)}:`, error.message);
    console.log(`📄 Restoring default content for: ${path.basename(filePath)}`);
    await fs.writeJson(filePath, defaultValue, { spaces: 2 });
    return defaultValue;
  }
}

async function safeWriteJson(filePath, data) {
  try {
    // Create backup before writing
    if (await fs.pathExists(filePath)) {
      const backupPath = `${filePath}.backup`;
      await fs.copy(filePath, backupPath);
    }
    
    await fs.writeJson(filePath, data, { spaces: 2 });
    console.log(`✅ Successfully saved: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing ${path.basename(filePath)}:`, error.message);
    
    // Try to restore from backup
    const backupPath = `${filePath}.backup`;
    if (await fs.pathExists(backupPath)) {
      try {
        await fs.copy(backupPath, filePath);
        console.log(`🔄 Restored from backup: ${path.basename(filePath)}`);
      } catch (restoreError) {
        console.error(`❌ Failed to restore backup:`, restoreError.message);
      }
    }
    
    throw error;
  }
}

// Initialize all JSON files with default values
async function initializeDataFiles() {
  const defaultSettings = {
    title: "PXLR CMS",
    description: "Modern headless CMS for Next.js"
  };
  
  const defaultMenu = [
    { id: 'home', name: 'Главная', url: '/', order: 1 },
    { id: 'posts', name: 'Посты', url: '/posts', order: 2 },
    { id: 'about', name: 'О проекте', url: '/about', order: 3 }
  ];
  
  const defaultPages = {
    home: {
      title: 'Добро пожаловать на PXLR CMS',
      content: `Это демонстрационная страница, созданная автоматически.

PXLR CMS - современная система управления контентом для Next.js, которая позволяет легко создавать и редактировать содержимое вашего сайта.

Основные возможности:
• Управление страницами и постами
• Настройка меню навигации  
• Редактирование в реальном времени
• Поддержка Markdown
• Автосохранение

Перейдите в админку чтобы начать редактирование!`,
      slug: 'home',
      isHomePage: true
    },
    about: {
      title: 'О проекте',
      content: `PXLR CMS создан для разработчиков, которые хотят быстро добавить систему управления контентом в свои Next.js проекты.

Система не требует базы данных и работает с файлами, что делает её простой в развертывании и обслуживании.

Все изменения сохраняются мгновенно и сразу отображаются на вашем сайте.`,
      slug: 'about',
      isHomePage: false
    }
  };
  
  // Initialize all files
  await safeReadJson(settingsFile, defaultSettings);
  await safeReadJson(menuFile, defaultMenu);
  const currentPages = await safeReadJson(pagesFile, defaultPages);
  
  // Create MDX files for all pages
  for (const [slug, pageData] of Object.entries(currentPages)) {
    try {
      await createNextjsPageFile(slug, pageData.title, pageData.content);
    } catch (error) {
      console.warn(`Warning: Could not create MDX file for page "${slug}":`, error.message);
    }
  }
  
  console.log('✅ All data files and MDX files initialized successfully');
}

// Initialize data files
await initializeDataFiles();

// Menu initialization moved to initializeDataFiles()

// Create demo posts if posts directory is empty
async function createDemoPosts() {
  try {
    const files = await fs.readdir(postsDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    if (mdxFiles.length === 0) {
      // Create demo posts
      const demoPosts = [
        {
          slug: 'dobro-pozhalovat-v-pxlr-cms',
          title: 'Добро пожаловать в PXLR CMS',
          description: 'Знакомство с возможностями системы управления контентом',
          content: `Добро пожаловать в PXLR CMS! Это ваш первый пост, созданный автоматически.

## Что такое PXLR CMS?

PXLR CMS - это современная система управления контентом, созданная специально для проектов на Next.js. Она позволяет легко создавать и редактировать контент без необходимости работы с кодом.

## Основные возможности

### Управление страницами
Создавайте и редактируйте страницы вашего сайта прямо из админки. Все изменения применяются мгновенно.

### Система постов
Ведите блог или публикуйте новости с помощью удобного редактора постов.

### Настройка меню
Управляйте навигацией сайта - добавляйте новые пункты меню или изменяйте существующие.

### Поддержка Markdown
Форматируйте текст с помощью Markdown для создания красивого контента.

## Начало работы

1. Откройте админку по адресу \`localhost:3333\`
2. Создайте новые страницы и посты
3. Настройте меню навигации
4. Наслаждайтесь результатом!

Удачи в использовании PXLR CMS! 🚀`
        },
        {
          slug: 'rukovodstvo-po-markdown',
          title: 'Руководство по Markdown',
          description: 'Основы форматирования текста в Markdown',
          content: `Markdown - это простой язык разметки, который позволяет форматировать текст с помощью обычных символов.

## Заголовки

Используйте символы \`#\` для создания заголовков:

\`\`\`
# Заголовок 1 уровня
## Заголовок 2 уровня  
### Заголовок 3 уровня
\`\`\`

## Форматирование текста

**Жирный текст** - используйте \`**текст**\`
*Курсив* - используйте \`*текст*\`
\`Код\` - используйте обратные кавычки

## Списки

Маркированный список:
* Пункт 1
* Пункт 2
* Пункт 3

Нумерованный список:
1. Первый пункт
2. Второй пункт
3. Третий пункт

## Ссылки

[Ссылка на сайт](https://example.com)

## Блоки кода

\`\`\`javascript
function hello() {
  console.log("Привет, мир!");
}
\`\`\`

Это основы Markdown! Попробуйте редактировать этот пост в админке.`
        }
      ];

      for (const demo of demoPosts) {
        const mdxContent = `---
title: ${demo.title}
description: ${demo.description}
date: ${new Date().toISOString()}
---

${demo.content}`;

        const filePath = path.join(postsDir, `${demo.slug}.mdx`);
        await fs.writeFile(filePath, mdxContent, 'utf-8');
      }
      
      console.log('✅ Created demo posts');
    }
  } catch (error) {
    console.error('Error creating demo posts:', error);
  }
}

// Initialize demo posts
await createDemoPosts();

// Pages initialization moved to initializeDataFiles()

// Transliteration function for Russian to English slugs
function transliterate(text) {
  const ru = 'а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я'.split(' ');
  const en = 'a b v g d e e zh z i y k l m n o p r s t u f h ts ch sh sch  y  e yu ya'.split(' ');
  
  let result = text.toLowerCase();
  
  for (let i = 0; i < ru.length; i++) {
    result = result.replace(new RegExp(ru[i], 'g'), en[i]);
  }
  
  // Replace spaces with hyphens and remove special characters
  result = result
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
    
  return result;
}

// Generate slug from title
function generateSlug(title) {
  return transliterate(title);
}

// API Routes

// Menu API endpoints
app.get('/api/menu', async (req, res) => {
  try {
    const defaultMenu = [
      { id: 'home', name: 'Главная', url: '/', order: 1 },
      { id: 'posts', name: 'Посты', url: '/posts', order: 2 },
      { id: 'about', name: 'О проекте', url: '/about', order: 3 }
    ];
    const menu = await safeReadJson(menuFile, defaultMenu);
    res.json(menu);
  } catch (error) {
    console.error('Error reading menu:', error);
    res.status(500).json({ error: 'Failed to read menu' });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const menu = req.body;
    
    if (!Array.isArray(menu)) {
      return res.status(400).json({ error: 'Menu must be an array' });
    }
    
    await safeWriteJson(menuFile, menu);
    res.json({ success: true, menu });
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ error: 'Failed to update menu' });
  }
});

// Pages API endpoints
app.get('/api/pages', async (req, res) => {
  try {
    const defaultPages = {
      home: {
        title: 'Добро пожаловать на PXLR CMS',
        content: 'Это демонстрационная страница',
        slug: 'home',
        isHomePage: true
      }
    };
    const pages = await safeReadJson(pagesFile, defaultPages);
    res.json(pages);
  } catch (error) {
    console.error('Error reading pages:', error);
    res.status(500).json({ error: 'Failed to read pages' });
  }
});

app.get('/api/pages/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const defaultPages = {};
    const pages = await safeReadJson(pagesFile, defaultPages);
    const page = pages[slug];
    
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error reading page:', error);
    res.status(500).json({ error: 'Failed to read page' });
  }
});

app.post('/api/pages/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, newSlug } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const defaultPages = {};
    const pages = await safeReadJson(pagesFile, defaultPages);
    
    // If slug is changing, move the page
    const finalSlug = newSlug && newSlug !== slug ? newSlug : slug;
    
    const pageData = {
      title,
      content,
      slug: finalSlug,
      isHomePage: slug === 'home' || pages[slug]?.isHomePage
    };
    
    // Remove old entry if slug changed
    if (newSlug && newSlug !== slug) {
      delete pages[slug];
      // Rename the Next.js file when slug changes
      await renameNextjsPageFile(slug, finalSlug, title, content);
    } else {
      // Create or update the Next.js page file
      await createNextjsPageFile(finalSlug, title, content);
    }
    
    pages[finalSlug] = pageData;
    
    await safeWriteJson(pagesFile, pages);
    
    res.json({ 
      success: true, 
      slug: finalSlug, 
      page: pageData,
      message: 'Page saved successfully' 
    });
  } catch (error) {
    console.error('Error saving page:', error);
    res.status(500).json({ error: 'Failed to save page' });
  }
});

app.delete('/api/pages/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const defaultPages = {};
    const pages = await safeReadJson(pagesFile, defaultPages);
    
    if (!pages[slug]) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    if (pages[slug].isHomePage) {
      return res.status(400).json({ error: 'Cannot delete home page' });
    }
    
    // Delete the Next.js page file
    await deleteNextjsPageFile(slug);
    
    delete pages[slug];
    await safeWriteJson(pagesFile, pages);
    
    res.json({ 
      success: true, 
      slug, 
      message: 'Page deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

// Generate slug from title endpoint
app.post('/api/generate-slug', (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const slug = generateSlug(title);
    res.json({ slug });
  } catch (error) {
    console.error('Error generating slug:', error);
    res.status(500).json({ error: 'Failed to generate slug' });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const files = await fs.readdir(postsDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    let totalSize = 0;
    let recentPostsCount = 0;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const stats = await fs.stat(path.join(postsDir, file));
        totalSize += stats.size;
        
        if (new Date(stats.mtime) > oneWeekAgo) {
          recentPostsCount++;
        }
        
        return {
          file,
          size: stats.size,
          lastModified: stats.mtime
        };
      })
    );
    
    // Sort by last modified to get latest post
    posts.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    
    const stats = {
      totalPosts: mdxFiles.length,
      totalSize,
      recentPostsCount,
      latestPost: posts.length > 0 ? {
        filename: posts[0].file,
        lastModified: posts[0].lastModified
      } : null,
      averagePostSize: mdxFiles.length > 0 ? Math.round(totalSize / mdxFiles.length) : 0
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Get settings
app.get('/api/settings', async (req, res) => {
  try {
    const defaultSettings = {
      title: "PXLR CMS",
      description: "Modern headless CMS for Next.js"
    };
    const settings = await safeReadJson(settingsFile, defaultSettings);
    res.json(settings);
  } catch (error) {
    console.error('Error reading settings:', error);
    res.status(500).json({ error: 'Failed to read settings' });
  }
});

// Update settings
app.post('/api/settings', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const settings = { title, description };
    await safeWriteJson(settingsFile, settings);
    
    // Update Next.js layout.tsx
    await updateNextjsLayout(title, description);
    
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const files = await fs.readdir(postsDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const content = await fs.readFile(path.join(postsDir, file), 'utf-8');
        const slug = file.replace('.mdx', '');
        const stats = await fs.stat(path.join(postsDir, file));
        
        // Parse frontmatter
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);
        let frontmatter = {};
        
        if (match) {
          try {
            const frontmatterLines = match[1].split('\n');
            frontmatterLines.forEach(line => {
              const colonIndex = line.indexOf(':');
              if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim().replace(/['"]/g, '');
                frontmatter[key] = value;
              }
            });
          } catch (e) {
            console.error('Error parsing frontmatter:', e);
          }
        }
        
        return {
          slug,
          filename: file,
          content,
          frontmatter,
          lastModified: stats.mtime,
          size: stats.size,
          // Используем дату из frontmatter или дату модификации файла
          sortDate: frontmatter.date || stats.mtime.toISOString()
        };
      })
    );
    
    // Sort by post date (newest first) - учитываем custom даты
    posts.sort((a, b) => {
      const dateA = new Date(a.sortDate);
      const dateB = new Date(b.sortDate);
      return dateB - dateA;
    });
    
    res.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Failed to read posts' });
  }
});

// Get single post
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const filename = `${slug}.mdx`;
    const filePath = path.join(postsDir, filename);
    
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);
    
    res.json({
      slug,
      filename,
      content,
      lastModified: stats.mtime,
      size: stats.size
    });
  } catch (error) {
    console.error('Error reading post:', error);
    res.status(500).json({ error: 'Failed to read post' });
  }
});

// Create or update post
app.post('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { content, title, description, date, customDate } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    // Используем дату из запроса или текущую дату
    const postDate = date || new Date().toISOString();
    
    // Проверяем валидность даты
    let finalDate;
    try {
      finalDate = new Date(postDate).toISOString();
    } catch (error) {
      console.warn('Invalid date provided, using current date:', postDate);
      finalDate = new Date().toISOString();
    }
    
    // Generate MDX content with frontmatter
    const mdxContent = `---
title: ${title || slug}
description: ${description || ''}
date: ${finalDate}
customDate: ${customDate || false}
---

${content}`;
    
    const filename = `${slug}.mdx`;
    const filePath = path.join(postsDir, filename);
    
    const existed = await fs.pathExists(filePath);
    await fs.writeFile(filePath, mdxContent, 'utf-8');
    
    const action = existed ? 'Updated' : 'Created';
    const dateInfo = customDate ? 
      `📅 Custom date: ${new Date(finalDate).toLocaleString('ru-RU')}` : 
      `📅 Auto date: ${new Date(finalDate).toLocaleString('ru-RU')}`;
    
    console.log(`✅ ${action} post: ${filename} - ${dateInfo}`);
    
    res.json({ 
      success: true, 
      slug, 
      filename,
      date: finalDate,
      customDate: customDate || false,
      message: `Post ${action.toLowerCase()} successfully` 
    });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});

// Delete post
app.delete('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const filename = `${slug}.mdx`;
    const filePath = path.join(postsDir, filename);
    
    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await fs.remove(filePath);
    
    console.log(`🗑️ Deleted post: ${filename}`);
    
    res.json({ 
      success: true, 
      slug, 
      message: 'Post deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Function to update Next.js layout
async function updateNextjsLayout(title, description) {
  const layoutPath = path.join(__dirname, '../frontend/src/app/layout.tsx');
  
  try {
    let layoutContent = await fs.readFile(layoutPath, 'utf-8');
    
    // Update metadata
    const metadataRegex = /export const metadata: Metadata = \{[\s\S]*?\};/;
    const newMetadata = `export const metadata: Metadata = {
  title: "${title}",
  description: "${description}",
};`;
    
    layoutContent = layoutContent.replace(metadataRegex, newMetadata);
    
    await fs.writeFile(layoutPath, layoutContent, 'utf-8');
    console.log('✅ Updated Next.js layout metadata');
  } catch (error) {
    console.error('❌ Error updating Next.js layout:', error);
  }
}

// Function to create/update .mdx page files in content folder
async function createNextjsPageFile(slug, title, content) {
  const pagePath = path.join(pagesDir, `${slug}.mdx`);
  
  try {
    // Create MDX content with frontmatter
    const mdxContent = `---
title: "${title}"
description: ""
slug: "${slug}"
isHomePage: ${slug === 'home'}
date: "${new Date().toISOString().split('T')[0]}"
---

${content}`;
    
    await fs.writeFile(pagePath, mdxContent, 'utf-8');
    console.log(`✅ Created/updated MDX page: ${slug}.mdx`);
  } catch (error) {
    console.error(`❌ Error creating MDX page for ${slug}:`, error);
  }
}

// Function to delete .mdx page file
async function deleteNextjsPageFile(slug) {
  // Don't delete home page
  if (slug === 'home') {
    return;
  }

  const pagePath = path.join(pagesDir, `${slug}.mdx`);
  
  try {
    // Check if file exists
    if (await fs.pathExists(pagePath)) {
      await fs.remove(pagePath);
      console.log(`✅ Deleted MDX page: ${slug}.mdx`);
    }
  } catch (error) {
    console.error(`❌ Error deleting MDX page for ${slug}:`, error);
  }
}

// Function to rename .mdx page file (when slug changes)
async function renameNextjsPageFile(oldSlug, newSlug, title, content) {
  // Delete old file and create new one
  await deleteNextjsPageFile(oldSlug);
  await createNextjsPageFile(newSlug, title, content);
}



// Homepage API endpoints  
app.get('/api/homepage', async (req, res) => {
  try {
    const homepagePath = path.join(__dirname, '../frontend/src/content/pages/home.mdx');
    
    if (!await fs.pathExists(homepagePath)) {
      return res.json({
        title: 'Добро пожаловать на PXLR CMS',
        description: 'Современная система управления контентом для Next.js',
        content: `# Добро пожаловать на PXLR CMS

PXLR CMS - современная система управления контентом для Next.js, которая позволяет легко создавать и редактировать содержимое вашего сайта.

## Основные возможности

- **Управление страницами и постами** - создавайте и редактируйте контент прямо в админке
- **Настройка меню навигации** - гибкая система создания меню для сайта  
- **Редактирование в реальном времени** - изменения сохраняются мгновенно
- **Поддержка Markdown** - используйте удобный синтаксис разметки
- **Автосохранение** - никогда не потеряйте свою работу

## Начало работы

1. Перейдите в [админку](http://localhost:3333) для управления контентом
2. Создайте новые страницы в разделе "Страницы"
3. Настройте навигацию в разделе "Меню"
4. Опубликуйте посты в разделе "Посты"

Система готова к использованию прямо сейчас! 🚀`
      });
    }

    const fileContents = await fs.readFile(homepagePath, 'utf-8');
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = fileContents.match(frontmatterRegex);
    
    if (!match) {
      return res.status(500).json({ error: 'Invalid MDX format' });
    }

    const frontmatterContent = match[1];
    const content = match[2].trim();
    
    // Parse frontmatter
    const frontmatter = {};
    const frontmatterLines = frontmatterContent.split('\n');
    frontmatterLines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim().replace(/['"]/g, '');
        frontmatter[key] = value;
      }
    });

    res.json({
      title: frontmatter.title || 'Главная страница',
      description: frontmatter.description || '',
      content: content
    });
  } catch (error) {
    console.error('Error reading homepage:', error);
    res.status(500).json({ error: 'Failed to read homepage' });
  }
});

app.post('/api/homepage', async (req, res) => {
  try {
    const { title, description, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const homepagePath = path.join(__dirname, '../frontend/src/content/pages/home.mdx');
    
    // Create directory if it doesn't exist
    await fs.ensureDir(path.dirname(homepagePath));
    
    // Create MDX content with frontmatter
    const mdxContent = `---
title: "${title}"
description: "${description || ''}"
slug: "home"
isHomePage: true
date: "${new Date().toISOString().split('T')[0]}"
---

${content}`;
    
    await fs.writeFile(homepagePath, mdxContent, 'utf-8');
    
    res.json({ 
      success: true, 
      message: 'Главная страница успешно сохранена' 
    });
  } catch (error) {
    console.error('Error saving homepage:', error);
    res.status(500).json({ error: 'Failed to save homepage' });
  }
});

// Serve admin panel
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 PXLR Headless CMS running on http://localhost:${PORT}`);
  console.log(`📝 Admin panel: http://localhost:${PORT}`);
}); 