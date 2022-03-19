import { Link } from 'react-router-dom'
import { useDarkMode } from '../support/useDarkMode'
import { SvgDarkTheme, SvgLightTheme } from '../../img/svg'
import {TypesTheme} from "../support/constants";

const Header = (props) => {
  const [typeTheme, setTheme] = useDarkMode()
  const changeTheme = () => {
    setTheme(typeTheme)
  }
  return (
    <div
      onClick={changeTheme}
      className="w-full bg-white border-b-2 border-slate-200 dark:bg-gray-600 transition duration-1000 h-12 flex justify-end pr-4 pt-2 "
    >
      {typeTheme === TypesTheme.Light ? <SvgLightTheme /> : <SvgDarkTheme />}
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
