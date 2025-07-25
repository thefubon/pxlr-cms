import axios from 'axios';
import { Post, PostsListResponse, CreatePostRequest, UpdatePostRequest } from '@/types/post';
import { Settings, SettingsResponse } from '@/types/settings';
import { PostFormInput } from '@/lib/validations';

// Определяем URL API в зависимости от окружения
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // В продакшене используем относительный URL
    return `${window.location.origin.replace(':5174', ':3333').replace(':5173', ':3333')}/api`;
  }
  return import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor для логирования
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Можно добавить обработку специфичных ошибок
    if (error.response?.status === 404) {
      throw new Error('Ресурс не найден');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Ошибка сервера. Попробуйте позже.');
    }
    
    throw error;
  }
);

export const postsApi = {
  // Получить все посты
  async getAllPosts(): Promise<PostsListResponse> {
    const response = await api.get<PostsListResponse>('/posts');
    return response.data;
  },

  // Получить пост по slug
  async getPost(slug: string): Promise<Post> {
    const response = await api.get<Post>(`/posts/${slug}`);
    return response.data;
  },

  // Создать новый пост (старый API)
  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  // Создать новый пост из формы
  async createPostFromForm(data: PostFormInput): Promise<Post> {
    const response = await api.post<Post>('/posts/form', data);
    return response.data;
  },

  // Обновить пост
  async updatePost(slug: string, data: UpdatePostRequest): Promise<Post> {
    const response = await api.put<Post>(`/posts/${slug}`, data);
    return response.data;
  },

  // Удалить пост
  async deletePost(slug: string): Promise<void> {
    await api.delete(`/posts/${slug}`);
  },
};

export const healthApi = {
  // Проверка состояния сервера
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await api.get('/health');
    return response.data;
  },
};

export const settingsApi = {
  // Получить все настройки
  async getSettings(): Promise<Settings> {
    const response = await api.get<Settings>('/settings');
    return response.data;
  },

  // Обновить настройки
  async updateSettings(settings: Settings): Promise<SettingsResponse> {
    const response = await api.put<SettingsResponse>('/settings', settings);
    return response.data;
  },

  // Получить только общие настройки
  async getGeneralSettings(): Promise<Settings['general']> {
    const response = await api.get<Settings['general']>('/settings/general');
    return response.data;
  },

  // Получить только настройки постов
  async getPostSettings(): Promise<Settings['posts']> {
    const response = await api.get<Settings['posts']>('/settings/posts');
    return response.data;
  },

  // Очистить кэш настроек
  async clearCache(): Promise<{ success: boolean; message: string }> {
    const response = await api.post<{ success: boolean; message: string }>('/settings/clear-cache');
    return response.data;
  },
};

export default api; 