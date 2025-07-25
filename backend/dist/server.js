"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const static_1 = __importDefault(require("@fastify/static"));
const path = __importStar(require("path"));
const posts_1 = __importDefault(require("./routes/posts"));
const settings_1 = __importDefault(require("./routes/settings"));
const uploads_1 = require("./routes/uploads");
const fastify = (0, fastify_1.default)({
    logger: true
});
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3333;
const HOST = process.env.HOST || '0.0.0.0';
async function start() {
    try {
        await fastify.register(cors_1.default, {
            origin: [
                'http://localhost:3000',
                'http://localhost:3002',
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:5175',
                'http://localhost:5176',
                'https://pxlr.ru',
                'https://www.pxlr.ru',
                'https://admin.pxlr.ru',
                'https://www.admin.pxlr.ru',
            ],
            credentials: true,
        });
        await fastify.register(static_1.default, {
            root: path.join(__dirname, '..', 'content'),
            prefix: '/content/',
        });
        await fastify.register(static_1.default, {
            root: path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads'),
            prefix: '/uploads/',
            decorateReply: false,
        });
        await fastify.register(posts_1.default, { prefix: '/api' });
        await fastify.register(settings_1.default);
        await fastify.register(uploads_1.uploadsRoutes);
        fastify.get('/health', async (request, reply) => {
            return { status: 'ok', timestamp: new Date().toISOString() };
        });
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
        await fastify.listen({ port: PORT, host: HOST });
        console.log(`🚀 Backend server running on http://${HOST}:${PORT}`);
        console.log(`📝 API available at http://${HOST}:${PORT}/api`);
        console.log(`📁 Content available at http://${HOST}:${PORT}/content`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
process.on('SIGINT', async () => {
    try {
        await fastify.close();
        console.log('✅ Server closed gracefully');
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Error during shutdown:', err);
        process.exit(1);
    }
});
start();
//# sourceMappingURL=server.js.map