# 🚀 Инструкции по деплою PXLR CMS

## 📋 Обзор

PXLR CMS состоит из трех компонентов:
- **Backend API** (Fastify) - порт 3333
- **Admin Panel** (Vite + React) - порт 5173  
- **Frontend** (Next.js) - порт 3000

## 🌐 Продакшн URL

После деплоя система будет доступна по следующим адресам:
- **Сайт**: https://pxlr.ru
- **Админ-панель**: https://admin.pxlr.ru
- **API**: https://api.pxlr.ru

## 🔧 Переменные окружения

### Backend (.env)
```env
NODE_ENV=production
PORT=3333
HOST=0.0.0.0
```

### Admin Panel (.env)
```env
VITE_API_URL=https://api.pxlr.ru/api
NODE_ENV=production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=https://api.pxlr.ru
BACKEND_URL=https://api.pxlr.ru
NODE_ENV=production
```

## 🚀 Деплой на Vercel

### 1. Backend (API)
```bash
# В директории backend/
vercel --prod
```

### 2. Admin Panel
```bash
# В директории admin/
vercel --prod
```

### 3. Frontend
```bash
# В директории frontend/
vercel --prod
```

## 🔗 Настройка доменов

### 1. Настройте DNS записи:
```
A     api.pxlr.ru     → [IP вашего сервера]
A     admin.pxlr.ru   → [IP вашего сервера]  
A     pxlr.ru         → [IP вашего сервера]
```

### 2. Настройте SSL сертификаты (Let's Encrypt):
```bash
sudo certbot --nginx -d api.pxlr.ru
sudo certbot --nginx -d admin.pxlr.ru
sudo certbot --nginx -d pxlr.ru
```

## 🐳 Деплой через Docker

### 1. Создайте docker-compose.yml:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3333:3333"
    environment:
      - NODE_ENV=production
      - PORT=3333
      - HOST=0.0.0.0
    volumes:
      - ./backend/content:/app/content
      - ./frontend/public/uploads:/app/uploads

  admin:
    build: ./admin
    ports:
      - "5173:80"
    environment:
      - VITE_API_URL=https://api.pxlr.ru/api
    depends_on:
      - backend

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=https://api.pxlr.ru
      - BACKEND_URL=https://api.pxlr.ru
    depends_on:
      - backend
```

### 2. Запустите:
```bash
docker-compose up -d
```

## 🔒 Безопасность

### 1. Настройте CORS в backend:
```typescript
// backend/src/server.ts
await fastify.register(cors, {
  origin: [
    'https://pxlr.ru',
    'https://www.pxlr.ru', 
    'https://admin.pxlr.ru',
    'https://www.admin.pxlr.ru',
  ],
  credentials: true,
});
```

### 2. Настройте rate limiting:
```bash
npm install @fastify/rate-limit
```

### 3. Настройте helmet для безопасности:
```bash
npm install @fastify/helmet
```

## 📊 Мониторинг

### 1. Health check endpoint:
```bash
curl https://api.pxlr.ru/health
```

### 2. Логи:
```bash
# Backend logs
docker logs pxlr-cms-backend-1

# Admin logs  
docker logs pxlr-cms-admin-1

# Frontend logs
docker logs pxlr-cms-frontend-1
```

## 🔄 Обновление

### 1. Остановите сервисы:
```bash
docker-compose down
```

### 2. Обновите код:
```bash
git pull origin main
```

### 3. Пересоберите и запустите:
```bash
docker-compose up -d --build
```

## 🚨 Troubleshooting

### Проблема: Изображения не загружаются
**Решение**: Проверьте права доступа к папке uploads:
```bash
chmod 755 frontend/public/uploads
```

### Проблема: CORS ошибки
**Решение**: Убедитесь что домены правильно настроены в backend CORS.

### Проблема: 404 ошибки при загрузке настроек
**Решение**: Это нормально во время сборки. Backend должен быть запущен для работы настроек.

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи сервисов
2. Убедитесь что все переменные окружения настроены
3. Проверьте доступность всех доменов
4. Убедитесь что SSL сертификаты действительны 