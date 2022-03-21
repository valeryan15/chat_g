import React from 'react'
import { TypesTheme } from '../support/constants'
import { SvgDarkTheme, SvgLightTheme } from '../../img/svg'
import { useDarkMode } from '../support/useDarkMode'

const TypeTheme = () => {
  const [typeTheme, setTheme] = useDarkMode()
  const changeTheme = () => {
    setTheme(typeTheme)
  }
  return (
    <div
      onClick={changeTheme}
      className="w-full bg-white border-b-2 border-slate-200 dark:bg-gray-600 transition duration-1000 h-12 flex justify-end pr-4 pt-2 "
    >
      {typeTheme === TypesTheme.Light ? (
        <SvgLightTheme className="h-8 w-8 dark:text-white hover:bg-white dark:hover:text-yellow-600 rounded-full transition duration-1000" />
      ) : (
        <SvgDarkTheme className="h-8 w-8 rounded-full text-indigo-400 bg-white hover:text-indigo-600 hover:bg-gray-400 transition duration-1000" />
      )}
    </div>
  )
}

export default TypeTheme
