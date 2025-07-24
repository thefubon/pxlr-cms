import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/lib/api';
import { generateMDXContent } from '@/lib/utils';
import { PostFormInput } from '@/lib/validations';

// Хук для получения всех постов
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAllPosts,
  });
}

// Хук для получения одного поста
export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => postsApi.getPost(slug),
    enabled: !!slug,
  });
}

// Хук для создания поста
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PostFormInput) => {
      const mdxContent = generateMDXContent(
        data.title,
        data.description,
        data.content,
        {
          author: data.author,
          tags: data.tags || [],
          category: data.category,
          draft: data.draft,
          editorType: data.editorType || 'markdown',
        }
      );

      return postsApi.createPost({
        filename: data.slug + '.mdx',
        content: mdxContent,
      });
    },
    onSuccess: () => {
      // Инвалидируем кеш постов после создания
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// Хук для обновления поста
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, data }: { slug: string; data: PostFormInput }) => {
      const mdxContent = generateMDXContent(
        data.title,
        data.description,
        data.content,
        {
          author: data.author,
          tags: data.tags || [],
          category: data.category,
          draft: data.draft,
          editorType: data.editorType || 'markdown',
        }
      );

      return postsApi.updatePost(slug, { content: mdxContent });
    },
    onSuccess: (_, { slug }) => {
      // Инвалидируем кеш постов и конкретного поста
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', slug] });
    },
  });
}

// Хук для удаления поста
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
} 