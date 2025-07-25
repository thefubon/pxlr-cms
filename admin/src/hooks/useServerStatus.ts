import { useState, useEffect } from 'react';

export interface ServerStatus {
  isOnline: boolean;
  isLoading: boolean;
  lastChecked?: Date;
  error?: string;
}

// Определяем URL backend в зависимости от окружения
const getBackendUrl = () => {
  if (import.meta.env.PROD) {
    // В продакшене используем относительный URL
    return window.location.origin.replace(':5174', ':3333').replace(':5173', ':3333');
  }
  return 'http://localhost:3333';
};

// Frontend URL для iframe preview
export const getFrontendUrl = () => {
  if (import.meta.env.PROD) {
    // В продакшене используем относительный URL
    return window.location.origin.replace(':5174', ':3001').replace(':5173', ':3001');
  }
  return 'http://localhost:3001'; // Next.js запустился на порту 3001
};

const BACKEND_URL = getBackendUrl();
const CHECK_INTERVAL = 30000; // 30 секунд

export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus>({
    isOnline: false,
    isLoading: true,
  });

  const checkServerStatus = async () => {
    try {
      setStatus(prev => ({ ...prev, isLoading: true, error: undefined }));
      
      const response = await fetch(`${BACKEND_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Таймаут 5 секунд
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        setStatus({
          isOnline: true,
          isLoading: false,
          lastChecked: new Date(),
          error: undefined,
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      
      setStatus({
        isOnline: false,
        isLoading: false,
        lastChecked: new Date(),
        error: errorMessage,
      });
    }
  };

  useEffect(() => {
    // Проверяем сразу при монтировании
    checkServerStatus();

    // Устанавливаем интервал для периодической проверки
    const interval = setInterval(checkServerStatus, CHECK_INTERVAL);

    // Очистка при размонтировании
    return () => clearInterval(interval);
  }, []);

  return {
    ...status,
    checkNow: checkServerStatus,
  };
} 