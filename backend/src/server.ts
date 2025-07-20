import Fastify from 'fastify';
import cors from '@fastify/cors';
import staticFiles from '@fastify/static';
import * as path from 'path';
import postsRoutes from './routes/posts';
import settingsRoutes from './routes/settings';

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
        'http://localhost:5173', // Vite admin
      ],
      credentials: true,
    });

    // Регистрируем статические файлы (для content)
    await fastify.register(staticFiles, {
      root: path.join(__dirname, '..', 'content'),
      prefix: '/content/',
    });

    // Регистрируем роуты для API
    await fastify.register(postsRoutes, { prefix: '/api' });
    await fastify.register(settingsRoutes);

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