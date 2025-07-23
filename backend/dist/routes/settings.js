"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = settingsRoutes;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const defaultSettings = {
    general: {
        siteTitle: 'PXLR CMS - Современная система управления контентом',
        siteDescription: 'Современная CMS с Fastify backend, React админ-панелью и Next.js фронтендом'
    },
    posts: {
        postsPerPage: 6,
        categories: [
            'технологии',
            'дизайн',
            'разработка',
            'туториалы',
            'новости',
            'обзоры',
            'советы',
            'инструменты'
        ]
    }
};
const settingsPath = path_1.default.join(process.cwd(), 'settings.json');
async function loadSettings() {
    try {
        const data = await fs_1.promises.readFile(settingsPath, 'utf-8');
        const settings = JSON.parse(data);
        return {
            general: { ...defaultSettings.general, ...settings.general },
            posts: { ...defaultSettings.posts, ...settings.posts }
        };
    }
    catch (error) {
        return defaultSettings;
    }
}
async function saveSettings(settings) {
    await fs_1.promises.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');
}
async function settingsRoutes(fastify) {
    fastify.get('/api/settings', async (request, reply) => {
        try {
            const settings = await loadSettings();
            return settings;
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({
                error: 'Не удалось загрузить настройки',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
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
                            postsPerPage: { type: 'number', minimum: 1, maximum: 50 },
                            categories: {
                                type: 'array',
                                items: { type: 'string', minLength: 1, maxLength: 50 },
                                minItems: 0,
                                maxItems: 50
                            }
                        },
                        required: ['postsPerPage', 'categories']
                    }
                },
                required: ['general', 'posts']
            }
        }
    }, async (request, reply) => {
        try {
            const newSettings = request.body;
            if (!newSettings.general.siteTitle.trim()) {
                return reply.status(400).send({ error: 'Название сайта не может быть пустым' });
            }
            if (!newSettings.general.siteDescription.trim()) {
                return reply.status(400).send({ error: 'Описание сайта не может быть пустым' });
            }
            if (newSettings.posts.postsPerPage < 1 || newSettings.posts.postsPerPage > 50) {
                return reply.status(400).send({ error: 'Количество постов на странице должно быть от 1 до 50' });
            }
            if (!Array.isArray(newSettings.posts.categories)) {
                return reply.status(400).send({ error: 'Категории должны быть массивом' });
            }
            if (newSettings.posts.categories.length > 50) {
                return reply.status(400).send({ error: 'Максимальное количество категорий: 50' });
            }
            for (const category of newSettings.posts.categories) {
                if (typeof category !== 'string' || !category.trim()) {
                    return reply.status(400).send({ error: 'Категория не может быть пустой' });
                }
                if (category.length > 50) {
                    return reply.status(400).send({ error: 'Название категории не должно превышать 50 символов' });
                }
            }
            const uniqueCategories = [...new Set(newSettings.posts.categories.map(c => c.trim().toLowerCase()))];
            if (uniqueCategories.length !== newSettings.posts.categories.length) {
                return reply.status(400).send({ error: 'Категории не должны повторяться' });
            }
            await saveSettings(newSettings);
            fastify.log.info('Настройки обновлены:', newSettings);
            return {
                success: true,
                message: 'Настройки успешно сохранены',
                settings: newSettings
            };
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({
                error: 'Не удалось сохранить настройки',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
    fastify.get('/api/settings/general', async (request, reply) => {
        try {
            const settings = await loadSettings();
            return settings.general;
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({
                error: 'Не удалось загрузить общие настройки',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
    fastify.get('/api/settings/posts', async (request, reply) => {
        try {
            const settings = await loadSettings();
            return settings.posts;
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({
                error: 'Не удалось загрузить настройки постов',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
    fastify.post('/api/settings/clear-cache', async (request, reply) => {
        try {
            fastify.log.info('Settings cache cleared manually');
            return {
                success: true,
                message: 'Кэш настроек очищен',
                timestamp: new Date().toISOString()
            };
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({
                error: 'Не удалось очистить кэш',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
}
//# sourceMappingURL=settings.js.map