import React from 'react'
import { TypesTheme } from '../support/constants'
import { SvgDarkTheme, SvgLightTheme } from '../../img/svg'
import { useDarkMode } from '../support/useDarkMode'

const TypeTheme = (props) => {
  const [typeTheme, setTheme] = useDarkMode()
  const changeTheme = () => {
    setTheme(typeTheme)
    props.sendTheme(typeTheme)
  }
  return (
    <div
      onClick={changeTheme}
      className="w-full bg-white mt-48 dark:bg-gray-600 dark:text-white transition duration-1000 flex h-12 pt-2 "
    >
      <div className="mx-auto flex">
        <span className="mr-48">Change theme</span>

        {typeTheme === TypesTheme.Light ? (
          <SvgLightTheme className="h-8 w-8 dark:text-white hover:bg-white dark:hover:text-yellow-600 rounded-full transition duration-1000" />
        ) : (
          <SvgDarkTheme className="h-8 w-8 rounded-full text-indigo-400 bg-white hover:text-indigo-600 hover:bg-gray-400 transition duration-1000" />
        )}
      </div>
    </div>
  )
}

export default TypeTheme
