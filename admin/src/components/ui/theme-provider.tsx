import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "pxlr-admin-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Инициализируем тему после монтирования компонента
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
    setMounted(true)
  }, [storageKey])

  // Применяем тему к документу
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    const body = window.document.body

    // Удаляем все классы тем
    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")

    let effectiveTheme = theme

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      effectiveTheme = systemTheme
    }

    // Применяем тему к корневому элементу и body
    root.classList.add(effectiveTheme)
    body.classList.add(effectiveTheme)

    // Устанавливаем атрибут темы
    root.setAttribute("data-theme", effectiveTheme)
    
    // Принудительно обновляем CSS переменные
    if (effectiveTheme === "dark") {
      root.style.colorScheme = "dark"
    } else {
      root.style.colorScheme = "light"
    }
  }, [theme, mounted])

  // Слушаем изменения системной темы
  useEffect(() => {
    if (!mounted || theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      const root = window.document.documentElement
      const body = window.document.body
      const systemTheme = mediaQuery.matches ? "dark" : "light"
      
      root.classList.remove("light", "dark")
      body.classList.remove("light", "dark")
      root.classList.add(systemTheme)
      body.classList.add(systemTheme)
      root.setAttribute("data-theme", systemTheme)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  // Не рендерим пока не смонтировались (предотвращаем мигание)
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
} 