import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  currentTheme: 'light' | 'dark' // Gerçekte uygulanan tema
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme')
    return (savedTheme as Theme) || 'system'
  })

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')

  // Sistem temasını izle
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateTheme = (): void => {
      if (theme === 'system') {
        setCurrentTheme(mediaQuery.matches ? 'dark' : 'light')
      } else {
        setCurrentTheme(theme === 'dark' ? 'dark' : 'light')
      }
    }

    // İlk yükleme ve tema değişikliklerinde güncelle
    updateTheme()

    // Sistem teması değişikliklerini dinle
    const handler = (e: MediaQueryListEvent): void => {
      if (theme === 'system') {
        setCurrentTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handler)
    return (): void => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  // Temayı HTML'e uygula
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [theme, currentTheme])

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
