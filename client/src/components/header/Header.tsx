import { Link } from 'react-router-dom'
import * as React from "react";
import { FC } from 'react';
type Props = {
  isAuth: boolean
  login: string
  logoutThunk: any
}
const Header: FC<Props> = (props) => {
  return (
    <div className='w-full bg-white border-b-[1px] border-gray-500 dark:bg-gray-600 transition duration-1000 h-12 flex justify-end pr-4 pt-2 '>
      <div className="text-black dark:text-white transition duration-500">
        <span className="mx-4">
          {!props.isAuth ?
            < Link to={'/auth'}>Sing up</Link> : null
          }
        </span>

        <span className="text-black dark:text-white transition duration-500">
          {props.isAuth ? (
            <span>
              {props.login}
              <button onClick={props.logoutThunk} className="ml-4">logout</button>
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
