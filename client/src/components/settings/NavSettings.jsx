import React from 'react'
import profileAvatar from '../../img/dOKeEPZehOc.jpeg'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'

const NavSettings = (props) => {
  return (
    <div className="min-h-full flex flex-col">
      <Link to={'/settings/profile'}>
        <div className="min-h-0 m-4 bg-gray-200 rounded-lg transition duration-1000 dark:bg-gray-600">
          <div className="flex justify-between">
            <img
              src={profileAvatar}
              className="w-20 h-20 rounded-full ml-4 "
              alt="profileImage"
            />
            <ul>
              <li className="text-black transition duration-1000 dark:text-white text-center pr-8">
                {props.name}
              </li>
              <li className="text-black transition duration-1000 dark:text-white text-center pr-8">
                {props.phone}
              </li>
              <li className="text-black transition duration-1000 dark:text-white pr-8">
                {props.login}
              </li>
            </ul>
          </div>
        </div>
      </Link>
      <div className="flex-auto">

      </div>
      <Footer />
    </div>
  )
}

export default NavSettings
