import React from 'react'

const User = (props) => {
  return (
    <div>
      <div className="changeButton text-left px-8 py-2 flex justify-between">
        {props.login}
        <button className="hover:bg-blue-200 transition duration-1000 dark:hover:bg-blue-900 rounded-lg px-4">
          добавить в чат
        </button>
      </div>
    </div>
  )
}

export default User
