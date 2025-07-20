/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // добавьте другие переменные здесь по мере необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 