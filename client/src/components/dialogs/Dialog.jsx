import React from 'react'
import userAva from '../../img/images.png'
import { Link } from 'react-router-dom'

const Dialog = () => {
  return (
    <Link to={'/main/chatWindow'}>
      <div className="border-b-2 dark:text-white border-slate-200 w-max h-16 ml-4 flex pt-2">
        <img
          src={userAva}
          alt="user pic"
          className="w-12 h-12 mr-2 rounded-full"
        />
        User Name
      </div>
    </Link>
  )
}

export default Dialog
