import React from 'react'

const Users = (props) => {
  return (
    <div>
        <div className="changeButton text-left px-8 py-2 flex justify-between">
          {props.login}
          <button className='hover:bg-blue-200 transition duration-1000 rounded-lg px-4'>add</button>
        </div>
    </div>
  )
}

export default Users
