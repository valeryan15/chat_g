import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className='w-full bg-white border-b-2 border-slate-200 dark:bg-gray-600 transition duration-1000 h-12 flex justify-end pr-4 pt-2 '>
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
