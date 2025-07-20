import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.getSettings,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: settingsApi.updateSettings,
    onSuccess: (data) => {
      // Обновляем кэш настроек
      queryClient.setQueryData(['settings'], data.settings);
      
      // Инвалидируем связанные запросы
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
}

export function useGeneralSettings() {
  return useQuery({
    queryKey: ['settings', 'general'],
    queryFn: settingsApi.getGeneralSettings,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePostSettings() {
  return useQuery({
    queryKey: ['settings', 'posts'],
    queryFn: settingsApi.getPostSettings,
    staleTime: 5 * 60 * 1000,
  });
}

export function useClearCache() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: settingsApi.clearCache,
    onSuccess: () => {
      // Инвалидируем все кэши настроек
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
} 