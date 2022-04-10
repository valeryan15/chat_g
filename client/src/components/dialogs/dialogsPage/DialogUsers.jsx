import React from 'react'
import userPic from '../../../img/images.png'

const DialogUsers = (props) => {

  return (
        <div className="border-y-2 my-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg dark:text-white transition duration-1000 border-slate-200 mx-4 h-16 flex items-center">
          <img src={userPic} className='rounded-full w-12 mr-4' alt="User Picture"/>
          {props.login}
        </div>
  )
}

export default DialogUsers

