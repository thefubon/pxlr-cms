import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { Post, CreatePostRequest, UpdatePostRequest, PostsListResponse, ApiErrorResponse } from '@/types/post';
import * as mdxUtils from '@/utils/mdx';
import * as path from 'path';

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Получить все посты
  fastify.get<{ Reply: PostsListResponse | ApiErrorResponse }>('/posts', async (request, reply) => {
    try {
      const posts = await mdxUtils.getAllPosts();
      return {
        posts,
        total: posts.length,
      };
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch posts' });
    }
  });

  // Получить пост по slug
  fastify.get<{ Params: { slug: string }; Reply: Post | ApiErrorResponse }>('/posts/:slug', async (request, reply) => {
    const { slug } = request.params;
    
    try {
      const post = await mdxUtils.getPostBySlug(slug);
      
      if (!post) {
        reply.status(404).send({ error: 'Post not found' });
        return;
      }
      
      return post;
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch post' });
    }
  });

  // Создать новый пост
  fastify.post<{ Body: CreatePostRequest; Reply: Post | ApiErrorResponse }>('/posts', async (request, reply) => {
    const { filename, content } = request.body;
    
    if (!filename || !content) {
      reply.status(400).send({ error: 'Filename and content are required' });
      return;
    }
    
    // Извлекаем slug из filename
    const slug = path.basename(filename, '.mdx');
    
    try {
      const post = await mdxUtils.createPost(slug, content);
      reply.status(201).send(post);
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        return reply.status(409).send({ error: error.message });
      } else {
        return reply.status(500).send({ error: 'Failed to create post' });
      }
    }
  });

  // Обновить пост
  fastify.put<{ Params: { slug: string }; Body: UpdatePostRequest; Reply: Post | ApiErrorResponse }>('/posts/:slug', async (request, reply) => {
    const { slug } = request.params;
    const { content } = request.body;
    
    if (!content) {
      reply.status(400).send({ error: 'Content is required' });
      return;
    }
    
    try {
      const post = await mdxUtils.updatePost(slug, content);
      return post;
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return reply.status(404).send({ error: error.message });
      } else {
        return reply.status(500).send({ error: 'Failed to update post' });
      }
    }
  });

  // Удалить пост
  fastify.delete<{ Params: { slug: string }; Reply: void | ApiErrorResponse }>('/posts/:slug', async (request, reply) => {
    const { slug } = request.params;
    
    try {
      const success = await mdxUtils.deletePost(slug);
      
      if (!success) {
        reply.status(404).send({ error: 'Post not found' });
        return;
      }
      
      reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to delete post' });
    }
  });
};

export default postsRoutes; 