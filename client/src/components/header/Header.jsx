import { Link } from 'react-router-dom'
import { useDarkMode } from '../support/useDarkMode'

const Header = (props) => {
  const [colorTheme, setTheme] = useDarkMode()
  const changeTheme = () => {
    setTheme(colorTheme)
  }
  return (
    <div onClick={changeTheme} className="w-full bg-gray-200 dark:bg-gray-600 transition duration-1000 h-12 flex justify-end pr-4 pt-2 mb-1">
      {colorTheme === 'light' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 dark:bg-white rounded-full hover:text-yellow-600 transition duration-1000"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      <div className="text-black dark:text-white transition duration-500">
        <span className="mx-4">
          <Link to={'/auth'}>Sing up</Link>
        </span>

        <span className="text-black dark:text-white transition duration-500">
          {props.isAuth ? (
            <span>
              {props.login}
              <button className="ml-4">logout</button>
            </span>
          ) : (
            <Link to={'/login'}>Sign in</Link>
          )}
        </span>
      </div>
    </div>
  )
}

export default Header
