import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesFile = path.join(__dirname, 'data/pages.json');
const pagesDir = path.join(__dirname, '../frontend/src/content/pages');

// Safe JSON read function
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

async function syncPages() {
  try {
    console.log('🔄 Синхронизация страниц из JSON в MDX...');
    
    // Убедимся что папки существуют
    await fs.ensureDir(pagesDir);
    
    // Прочитаем JSON файл со страницами с безопасной функцией
    const defaultPages = {
      home: {
        title: 'Добро пожаловать на PXLR CMS',
        content: 'Это демонстрационная страница',
        slug: 'home',
        isHomePage: true
      }
    };
    
    const pages = await safeReadJson(pagesFile, defaultPages);
    
    // Создадим MDX файлы для каждой страницы
    for (const [slug, pageData] of Object.entries(pages)) {
      const mdxPath = path.join(pagesDir, `${slug}.mdx`);
      
      const mdxContent = `---
title: "${pageData.title}"
description: ""
slug: "${slug}"
isHomePage: ${pageData.isHomePage || false}
date: "${new Date().toISOString().split('T')[0]}"
---

${pageData.content}`;
      
      await fs.writeFile(mdxPath, mdxContent, 'utf-8');
      console.log(`✅ Синхронизирована страница: ${slug}.mdx`);
    }
    
    console.log('🎉 Синхронизация завершена!');
  } catch (error) {
    console.error('❌ Ошибка синхронизации:', error);
  }
}

// Запускаем если скрипт вызывается напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  syncPages();
}

export { syncPages }; 