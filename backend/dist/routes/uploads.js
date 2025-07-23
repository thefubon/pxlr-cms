"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsRoutes = uploadsRoutes;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
async function uploadsRoutes(fastify) {
    await fastify.register((await import('@fastify/multipart')).default, {
        limits: {
            fileSize: 1024 * 1024,
        }
    });
    fastify.post('/api/uploads/image', async (request, reply) => {
        try {
            const data = await request.file();
            if (!data) {
                return reply.code(400).send({ error: 'Файл не найден' });
            }
            if (!data.mimetype.startsWith('image/')) {
                return reply.code(400).send({ error: 'Поддерживаются только изображения' });
            }
            const MAX_SIZE = 1024 * 1024;
            const buffer = await data.toBuffer();
            if (buffer.length > MAX_SIZE) {
                return reply.code(400).send({ error: 'Размер файла не должен превышать 1MB' });
            }
            const timestamp = Date.now();
            const extension = path_1.default.extname(data.filename || '').toLowerCase();
            const fileName = `${timestamp}${extension}`;
            const frontendDir = path_1.default.resolve(process.cwd(), '../frontend');
            const uploadsDir = path_1.default.join(frontendDir, 'public', 'uploads');
            try {
                await fs_1.promises.access(uploadsDir);
            }
            catch {
                await fs_1.promises.mkdir(uploadsDir, { recursive: true });
            }
            const filePath = path_1.default.join(uploadsDir, fileName);
            await fs_1.promises.writeFile(filePath, buffer);
            const fileUrl = `/uploads/${fileName}`;
            return reply.send({
                success: true,
                url: fileUrl,
                filename: fileName,
                originalName: data.filename,
                size: buffer.length,
                mimetype: data.mimetype
            });
        }
        catch (error) {
            console.error('Ошибка загрузки файла:', error);
            return reply.code(500).send({ error: 'Ошибка загрузки файла' });
        }
    });
}
//# sourceMappingURL=uploads.js.map