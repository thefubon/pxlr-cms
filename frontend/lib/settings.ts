import axios from 'axios';
import { Settings, GeneralSettings, PostSettings } from '@/types/settings';
import { getBackendUrl } from '@/lib/utils';

// Кэш настроек
let settingsCache: Settings | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 2 * 60 * 1000; // 2 минуты (баланс производительности/актуальности)

export async function getSettings(): Promise<Settings> {
  // Проверяем кэш
  const now = Date.now();
  if (settingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return settingsCache;
  }

  try {
    const response = await axios.get<Settings>(`${getBackendUrl()}/api/settings`);
    settingsCache = response.data;
    cacheTimestamp = now;
    return response.data;
  } catch (error) {
    console.error('Failed to load settings:', error);
    
    // Возвращаем дефолтные настройки в случае ошибки
    const defaultSettings: Settings = {
      general: {
        siteTitle: 'PXLR CMS - Современная система управления контентом',
        siteDescription: 'Современная CMS с Fastify backend, React админ-панелью и Next.js фронтендом'
      },
      posts: {
        postsPerPage: 6
      }
    };
    
    return defaultSettings;
  }
}

export async function getGeneralSettings(): Promise<GeneralSettings> {
  const settings = await getSettings();
  return settings.general;
}

export async function getPostSettings(): Promise<PostSettings> {
  const settings = await getSettings();
  return settings.posts;
}

// Очистка кэша (например, для разработки)
export function clearSettingsCache(): void {
  settingsCache = null;
  cacheTimestamp = 0;
} 