import { FastifyInstance } from 'fastify';
import { promises as fs } from 'fs';
import path from 'path';

// Типы для настроек
interface GeneralSettings {
  siteTitle: string;
  siteDescription: string;
}

interface PostSettings {
  postsPerPage: number;
}

interface Settings {
  general: GeneralSettings;
  posts: PostSettings;
}

// Дефолтные настройки
const defaultSettings: Settings = {
  general: {
    siteTitle: 'PXLR CMS - Современная система управления контентом',
    siteDescription: 'Современная CMS с Fastify backend, React админ-панелью и Next.js фронтендом'
  },
  posts: {
    postsPerPage: 6
  }
};

const settingsPath = path.join(process.cwd(), 'settings.json');

// Функции для работы с настройками
async function loadSettings(): Promise<Settings> {
  try {
    const data = await fs.readFile(settingsPath, 'utf-8');
    const settings = JSON.parse(data);
    // Объединяем с дефолтными настройками для обратной совместимости
    return {
      general: { ...defaultSettings.general, ...settings.general },
      posts: { ...defaultSettings.posts, ...settings.posts }
    };
  } catch (error) {
    // Файл не существует, возвращаем дефолтные настройки
    return defaultSettings;
  }
}

async function saveSettings(settings: Settings): Promise<void> {
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
}

export default async function settingsRoutes(fastify: FastifyInstance) {
  // GET /api/settings - получить настройки
  fastify.get('/api/settings', async (request, reply) => {
    try {
      const settings = await loadSettings();
      return settings;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Не удалось загрузить настройки',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // PUT /api/settings - обновить настройки
  fastify.put('/api/settings', {
    schema: {
      body: {
        type: 'object',
        properties: {
          general: {
            type: 'object',
            properties: {
              siteTitle: { type: 'string', minLength: 1, maxLength: 200 },
              siteDescription: { type: 'string', minLength: 1, maxLength: 500 }
            },
            required: ['siteTitle', 'siteDescription']
          },
          posts: {
            type: 'object',
            properties: {
              postsPerPage: { type: 'number', minimum: 1, maximum: 50 }
            },
            required: ['postsPerPage']
          }
        },
        required: ['general', 'posts']
      }
    }
  }, async (request, reply) => {
    try {
      const newSettings = request.body as Settings;
      
      // Валидация
      if (!newSettings.general.siteTitle.trim()) {
        return reply.status(400).send({ error: 'Название сайта не может быть пустым' });
      }
      
      if (!newSettings.general.siteDescription.trim()) {
        return reply.status(400).send({ error: 'Описание сайта не может быть пустым' });
      }
      
      if (newSettings.posts.postsPerPage < 1 || newSettings.posts.postsPerPage > 50) {
        return reply.status(400).send({ error: 'Количество постов на странице должно быть от 1 до 50' });
      }

      await saveSettings(newSettings);
      
      fastify.log.info('Настройки обновлены:', newSettings);
      
      return {
        success: true,
        message: 'Настройки успешно сохранены',
        settings: newSettings
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Не удалось сохранить настройки',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // GET /api/settings/general - только общие настройки
  fastify.get('/api/settings/general', async (request, reply) => {
    try {
      const settings = await loadSettings();
      return settings.general;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Не удалось загрузить общие настройки',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // GET /api/settings/posts - только настройки постов
  fastify.get('/api/settings/posts', async (request, reply) => {
    try {
      const settings = await loadSettings();
      return settings.posts;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Не удалось загрузить настройки постов',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // POST /api/settings/clear-cache - очистка кэша (для разработки)
  fastify.post('/api/settings/clear-cache', async (request, reply) => {
    try {
      fastify.log.info('Settings cache cleared manually');
      return { 
        success: true, 
        message: 'Кэш настроек очищен',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Не удалось очистить кэш',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
} 