import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className={'w-full bg-gray-600 h-8 flex justify-end pr-4 '}>
      <div className="text-white">
        <span className="mx-4">
          <Link to={'/auth'}>Sing up</Link>
        </span>

        <span className="text-white">
          {props.isAuth ? (
            <span>{props.login}
            <button className='ml-4'>logout</button></span>
          ) : (
            <Link to={'/login'}>Sign in</Link>
          )}
        </span>
      </div>
    </div>
  )
}

export default Header
