import React from 'react'
import ava from '../../img/dOKeEPZehOc.jpeg'
import {Link} from "react-router-dom";

const NavSettings = (props) => {
  return (
    <Link to ={'/settings/profileData'}>
    <div className='min-h-0 m-4 bg-gray-200 rounded-lg transition duration-1000 dark:bg-gray-600'>
      <div className='flex justify-between'>
        <img src={ava} className='w-20 h-20 rounded-full ml-4 ' alt='profileImage' />
          <ul>
            <li className='text-black transition duration-1000 dark:text-white text-center pr-8  '>{props.nameData}</li>
            <li className='text-black transition duration-1000 dark:text-white text-center pr-8   '>{props.phoneData}</li>
            <li className='text-black transition duration-1000 dark:text-white pr-8'>{props.login}</li>
          </ul>
      </div>
    </div>
    </Link>
  )
}


export default NavSettings


