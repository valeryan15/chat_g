import { useEffect, useState } from 'react'
import { TypesTheme } from './constants'

export const useDarkMode = () => {
  const [theme, setTheme] = useState(TypesTheme.Light)

  const typeTheme =
    theme === TypesTheme.Dark ? TypesTheme.Light : TypesTheme.Dark

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(typeTheme)
    root.classList.add(theme)
  }, [theme, typeTheme])
  return [typeTheme, setTheme]
}
