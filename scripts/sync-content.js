#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BACKEND_CONTENT = path.join(__dirname, '../backend/content');
const FRONTEND_CONTENT = path.join(__dirname, '../frontend/content');

/**
 * Синхронизация контента между backend и frontend
 */
function syncContent() {
  console.log('🔄 Начинаю синхронизацию контента...');
  
  try {
    // Создаем папку content во frontend если её нет
    if (!fs.existsSync(FRONTEND_CONTENT)) {
      fs.mkdirSync(FRONTEND_CONTENT, { recursive: true });
      console.log('📁 Создана папка frontend/content/');
    }

    // Читаем все файлы из backend/content
    const backendFiles = fs.readdirSync(BACKEND_CONTENT);
    const mdxFiles = backendFiles.filter(file => file.endsWith('.mdx'));
    
    console.log(`📝 Найдено ${mdxFiles.length} MDX файлов в backend/content/`);

    // Копируем каждый файл
    let syncedCount = 0;
    let skippedCount = 0;

    mdxFiles.forEach(file => {
      const sourcePath = path.join(BACKEND_CONTENT, file);
      const targetPath = path.join(FRONTEND_CONTENT, file);
      
      const sourceStats = fs.statSync(sourcePath);
      
      // Проверяем, нужно ли копировать файл
      let shouldCopy = true;
      
      if (fs.existsSync(targetPath)) {
        const targetStats = fs.statSync(targetPath);
        
        // Копируем только если файл в backend новее
        if (sourceStats.mtime <= targetStats.mtime) {
          shouldCopy = false;
          skippedCount++;
        }
      }
      
      if (shouldCopy) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Синхронизирован: ${file}`);
        syncedCount++;
      } else {
        console.log(`⏭️  Пропущен (не изменен): ${file}`);
      }
    });

    // Удаляем файлы из frontend, которых нет в backend
    const frontendFiles = fs.existsSync(FRONTEND_CONTENT) 
      ? fs.readdirSync(FRONTEND_CONTENT).filter(file => file.endsWith('.mdx'))
      : [];
    
    let deletedCount = 0;
    frontendFiles.forEach(file => {
      if (!mdxFiles.includes(file)) {
        const filePath = path.join(FRONTEND_CONTENT, file);
        fs.unlinkSync(filePath);
        console.log(`🗑️  Удален (нет в backend): ${file}`);
        deletedCount++;
      }
    });

    // Статистика
    console.log('\n📊 Результат синхронизации:');
    console.log(`✅ Синхронизировано: ${syncedCount} файлов`);
    console.log(`⏭️  Пропущено: ${skippedCount} файлов`);
    console.log(`🗑️  Удалено: ${deletedCount} файлов`);
    console.log(`📝 Всего файлов: ${mdxFiles.length}`);
    
    console.log('\n🎉 Синхронизация завершена!');
    
  } catch (error) {
    console.error('❌ Ошибка синхронизации:', error.message);
    process.exit(1);
  }
}

// Функция для наблюдения за изменениями
function watchContent() {
  console.log('👀 Наблюдение за изменениями в backend/content...');
  console.log('💡 Нажмите Ctrl+C для остановки\n');
  
  fs.watch(BACKEND_CONTENT, { recursive: false }, (eventType, filename) => {
    if (filename && filename.endsWith('.mdx')) {
      console.log(`🔔 Обнаружено изменение: ${filename} (${eventType})`);
      
      // Небольшая задержка для завершения записи файла
      setTimeout(() => {
        syncContent();
        console.log('👀 Продолжаю наблюдение...\n');
      }, 100);
    }
  });
}

// Обработка аргументов командной строки
const args = process.argv.slice(2);

if (args.includes('--watch') || args.includes('-w')) {
  // Первоначальная синхронизация
  syncContent();
  console.log('');
  
  // Затем наблюдение
  watchContent();
} else {
  // Только одноразовая синхронизация
  syncContent();
} 