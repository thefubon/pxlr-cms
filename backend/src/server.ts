import Fastify from 'fastify';
import cors from '@fastify/cors';
import staticFiles from '@fastify/static';
import * as path from 'path';
import postsRoutes from './routes/posts';
import settingsRoutes from './routes/settings';
import { uploadsRoutes } from './routes/uploads';

const fastify = Fastify({ 
  logger: true 
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3333;
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
  try {
    // Регистрируем CORS
    await fastify.register(cors, {
      origin: [
        'http://localhost:3000', // Next.js frontend
        'http://localhost:3002', // Next.js frontend (alternative port)
        'http://localhost:5173', // Vite admin
        'http://localhost:5174', // Vite admin (alternative port)
        'http://localhost:5175', // Vite admin (alternative port)
        'http://localhost:5176', // Vite admin (alternative port)
      ],
      credentials: true,
    });

    // Регистрируем статические файлы (для content)
    await fastify.register(staticFiles, {
      root: path.join(__dirname, '..', 'content'),
      prefix: '/content/',
    });

    // Регистрируем статические файлы (для uploads)
    await fastify.register(staticFiles, {
      root: path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads'),
      prefix: '/uploads/',
      decorateReply: false,
    });

    // Регистрируем роуты для API
    await fastify.register(postsRoutes, { prefix: '/api' });
    await fastify.register(settingsRoutes);
    await fastify.register(uploadsRoutes);

    // Health check
    fastify.get('/health', async (request, reply) => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    // Обработчик ошибок
    fastify.setErrorHandler((error, request, reply) => {
      fastify.log.error(error);
      
      if (error.validation) {
        reply.status(400).send({
          error: 'Validation Error',
          message: error.message,
          details: error.validation,
        });
        return;
      }
      
      reply.status(500).send({
        error: 'Internal Server Error',
        message: error.message,
      });
    });

    // Запускаем сервер
    await fastify.listen({ port: PORT, host: HOST });
    
    console.log(`🚀 Backend server running on http://${HOST}:${PORT}`);
    console.log(`📝 API available at http://${HOST}:${PORT}/api`);
    console.log(`📁 Content available at http://${HOST}:${PORT}/content`);
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await fastify.close();
    console.log('✅ Server closed gracefully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});

start(); 