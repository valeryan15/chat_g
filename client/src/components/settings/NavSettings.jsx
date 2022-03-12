import React from 'react'
import ava from '../../img/dOKeEPZehOc.jpeg'
import {Link} from "react-router-dom";

const NavSettings = (props) => {
  return (
    <Link to ={'/settings/profileData'}>
    <div className='h-24 m-4 bg-white rounded-lg border border-purple-50'>
      <div className='flex justify-between'>
        <img src={ava} className='w-16 rounded-full m-2' alt='profileImage' />
        <div className='m-2'>
          <ul>
            <li>{props.nameData}</li>
            <li>{props.phoneData}</li>
            <li>{props.login}</li>
          </ul>
        </div>
      </div>
    </div>
    </Link>
  )
}


export default NavSettings


