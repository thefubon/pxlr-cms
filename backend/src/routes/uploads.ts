import { FastifyInstance } from 'fastify';
import { promises as fs } from 'fs';
import path from 'path';

export async function uploadsRoutes(fastify: FastifyInstance) {
  // Регистрируем поддержку multipart/form-data
  await fastify.register((await import('@fastify/multipart')).default, {
    limits: {
      fileSize: 1024 * 1024, // 1MB
    }
  });

  // POST /api/uploads/image - загрузка изображения
  fastify.post('/api/uploads/image', async (request, reply) => {
    try {
      const data = await request.file();
      
      if (!data) {
        return reply.code(400).send({ error: 'Файл не найден' });
      }

      // Проверяем тип файла
      if (!data.mimetype.startsWith('image/')) {
        return reply.code(400).send({ error: 'Поддерживаются только изображения' });
      }

      // Проверяем размер файла
      const MAX_SIZE = 1024 * 1024; // 1MB
      const buffer = await data.toBuffer();
      
      if (buffer.length > MAX_SIZE) {
        return reply.code(400).send({ error: 'Размер файла не должен превышать 1MB' });
      }

      // Генерируем уникальное имя файла
      const timestamp = Date.now();
      const extension = path.extname(data.filename || '').toLowerCase();
      const fileName = `${timestamp}${extension}`;

      // Путь к папке uploads во фронтенде
      const frontendDir = path.resolve(process.cwd(), '../frontend');
      const uploadsDir = path.join(frontendDir, 'public', 'uploads');
      
      // Создаем папку если её нет
      try {
        await fs.access(uploadsDir);
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true });
      }

      // Сохраняем файл
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, buffer);

      // Возвращаем URL для использования в контенте
      const fileUrl = `/uploads/${fileName}`;

      return reply.send({
        success: true,
        url: fileUrl,
        filename: fileName,
        originalName: data.filename,
        size: buffer.length,
        mimetype: data.mimetype
      });
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      return reply.code(500).send({ error: 'Ошибка загрузки файла' });
    }
  });
} 