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
Object.defineProperty(exports, "__esModule", { value: true });
const mdxUtils = __importStar(require("@/utils/mdx"));
const path = __importStar(require("path"));
const postsRoutes = async (fastify) => {
    fastify.get('/posts', async (request, reply) => {
        try {
            const posts = await mdxUtils.getAllPosts();
            return {
                posts,
                total: posts.length,
            };
        }
        catch (error) {
            return reply.status(500).send({ error: 'Failed to fetch posts' });
        }
    });
    fastify.get('/posts/:slug', async (request, reply) => {
        const { slug } = request.params;
        try {
            const post = await mdxUtils.getPostBySlug(slug);
            if (!post) {
                reply.status(404).send({ error: 'Post not found' });
                return;
            }
            return post;
        }
        catch (error) {
            return reply.status(500).send({ error: 'Failed to fetch post' });
        }
    });
    fastify.post('/posts', async (request, reply) => {
        const { filename, content } = request.body;
        if (!filename || !content) {
            reply.status(400).send({ error: 'Filename and content are required' });
            return;
        }
        const slug = path.basename(filename, '.mdx');
        try {
            const post = await mdxUtils.createPost(slug, content);
            reply.status(201).send(post);
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('already exists')) {
                return reply.status(409).send({ error: error.message });
            }
            else {
                return reply.status(500).send({ error: 'Failed to create post' });
            }
        }
    });
    fastify.put('/posts/:slug', async (request, reply) => {
        const { slug } = request.params;
        const { content } = request.body;
        if (!content) {
            reply.status(400).send({ error: 'Content is required' });
            return;
        }
        try {
            const post = await mdxUtils.updatePost(slug, content);
            return post;
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('not found')) {
                return reply.status(404).send({ error: error.message });
            }
            else {
                return reply.status(500).send({ error: 'Failed to update post' });
            }
        }
    });
    fastify.delete('/posts/:slug', async (request, reply) => {
        const { slug } = request.params;
        try {
            const success = await mdxUtils.deletePost(slug);
            if (!success) {
                reply.status(404).send({ error: 'Post not found' });
                return;
            }
            reply.status(204).send();
        }
        catch (error) {
            return reply.status(500).send({ error: 'Failed to delete post' });
        }
    });
};
exports.default = postsRoutes;
//# sourceMappingURL=posts.js.map