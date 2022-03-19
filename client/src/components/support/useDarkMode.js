import {useEffect, useState} from "react";
import {TypesTheme} from "./constants";


export const useDarkMode = () => {
  const [theme, setTheme] = useState(TypesTheme.Light)

  const colorTheme = theme === TypesTheme.Dark ? TypesTheme.Light : TypesTheme.Dark

  useEffect( () => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
  }, [theme, colorTheme])
  return [colorTheme, setTheme]
}