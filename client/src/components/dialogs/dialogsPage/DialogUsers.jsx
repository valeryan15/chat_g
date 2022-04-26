import React from 'react'

const DialogUsers = (props) => {
  return (
    <div className="border-y-2 my-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg dark:text-white transition duration-1000 border-slate-200 mx-4 h-16 flex justify-between items-center">
      <div className="ml-4">{props.name}</div>
      <div className="mr-4 text-red-400 p-2">
        {props.newMessages === 0
          ? null
          : `новых: ${props.newMessages}`}
      </div>
    </div>
  )
}

export default DialogUsers
