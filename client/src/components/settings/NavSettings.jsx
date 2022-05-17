import React from 'react'
import profileAvatar from '../../img/dOKeEPZehOc.jpeg'
import { Link } from 'react-router-dom'

const NavSettings = (props) => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="editButton">
        <Link to={'/settings/profile'}>
          <div className="flex">
            <img
              src={profileAvatar}
              className="min-w-[80px] h-20 pt-1 rounded-full mx-4 "
              alt="profileImage"
            />
            <ul className="ml-8">
              <li className="text-black transition duration-1000 truncate max-w-[250px] dark:text-white pr-8">
                {props.name}
              </li>
              <li className="text-black transition duration-1000 dark:text-white pr-8">
                {props.phone}
              </li>
              <li className="text-black transition duration-1000 dark:text-white pr-8">
                {props.login}
              </li>
            </ul>
          </div>
        </Link>
      </div>

      <div className="flex-auto">
        <Link to="/settings/theme">
          <div className="theme">Theme</div>
        </Link>
      </div>
    </div>
  )
}

export default NavSettings
