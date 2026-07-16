import { HiMoon, HiSun } from 'react-icons/hi2'
import { useTheme } from '../../context/ThemeContext'
import IconButton from './IconButton'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <IconButton
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
    >
      {isDark ? <HiSun className="h-4 w-4" /> : <HiMoon className="h-4 w-4" />}
    </IconButton>
  )
}
