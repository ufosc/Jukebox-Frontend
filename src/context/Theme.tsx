import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ThemeManager } from 'src/utils'

export const ThemeContext = createContext({
  mode: undefined as ThemeMode | undefined,
  setMode: (mode: ThemeMode) => {},
  toggleMode: () => {},
  navOpen: false,
  toggleNavOpen: () => {},
})

export const Theme = (props: { children?: ReactNode }) => {
  const { children } = props
  const [mode, setMode] = useState<ThemeMode | undefined>()
  const [initialized, setInitialized] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const theme = ThemeManager.getInstance()

  const toggleNavOpen = () => {
    setNavOpen((prev) => !prev)
  }

  useEffect(() => {
    setMode(theme.getMode())
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized && mode) {
      theme.setMode(mode)
    }
  }, [mode])

  const toggleMode = () => {
    console.log('toggle mode')
    if (mode === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  return (
    <ThemeContext.Provider
      value={{ mode, setMode, toggleMode, navOpen, toggleNavOpen }}
    >
      <div
        id="theme-root"
        className={`theme theme--${mode} body`}
        ref={containerRef}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
