import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesFile = path.join(__dirname, 'data/pages.json');
const pagesDir = path.join(__dirname, '../frontend/src/content/pages');

async function syncPages() {
  try {
    console.log('🔄 Синхронизация страниц из JSON в MDX...');
    
    // Убедимся что папки существуют
    await fs.ensureDir(pagesDir);
    
    // Прочитаем JSON файл со страницами
    if (!await fs.pathExists(pagesFile)) {
      console.log('❌ Файл pages.json не найден');
      return;
    }
    
    const pages = await fs.readJson(pagesFile);
    
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