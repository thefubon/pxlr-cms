import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Склонение слов в русском языке
 * @param count - количество
 * @param forms - массив форм [1, 2-4, 5+]
 * @returns правильная форма слова
 */
export function pluralize(count: number, forms: [string, string, string]): string {
  const absCount = Math.abs(count)
  const lastDigit = absCount % 10
  const lastTwoDigits = absCount % 100

  // 11-14 - особый случай, всегда используем третью форму
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return forms[2]
  }

  // 1, 21, 31, 41... - первая форма (единственное число)
  if (lastDigit === 1) {
    return forms[0]
  }

  // 2, 3, 4, 22, 23, 24... - вторая форма
  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]
  }

  // 0, 5-20, 25-30... - третья форма
  return forms[2]
}

/**
 * Форматирование количества с правильным склонением
 */
export function formatCount(count: number, forms: [string, string, string]): string {
  return `${count} ${pluralize(count, forms)}`
}
