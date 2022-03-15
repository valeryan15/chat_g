import React from 'react'
import ava from '../../img/dOKeEPZehOc.jpeg'
import {Link} from "react-router-dom";

const NavSettings = (props) => {
  return (
    <Link to ={'/settings/profileData'}>
    <div className='min-h-0 m-4 bg-white rounded-lg transition duration-1000 dark:bg-gray-600'>
      <div className='flex justify-between'>
        <img src={ava} className='w-24 rounded-full m-2' alt='profileImage' />
        <div className='m-2'>
          <ul>
            <li className='text-black transition duration-1000 dark:text-white text-center px-4 py-1 '>{props.nameData}</li>
            <li className='text-black transition duration-1000 dark:text-white text-center px-4 py-1  my-2'>{props.phoneData}</li>
            <li className='text-black transition duration-1000 dark:text-white border px-4 py-1 '>{props.login}</li>
          </ul>
        </div>
      </div>
    </div>
    </Link>
  )
}


export default NavSettings


