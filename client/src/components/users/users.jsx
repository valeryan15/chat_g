import React from 'react'
import User from './User'
import FooterContainer from "../footer/FooterContainer";

const Users = (props) => {
  const user = props.users.map((u) => (
    <User
      toggleAddChat={props.toggleAddChat}
      chatExist={u.chatExist}
      createChat={props.createChat}
      id={u.id}
      login={u.login}
      key={u.id}
    />
  ))
  return (
    <div>
      <div className="flex h-full absolute w-full">
        <div className="min-w-[400px] bg-white border-r-2 border-slate-200 transition duration-1000 dark:bg-gray-600 h-full">
          {user}
        </div>
        <FooterContainer />
        <div className="bg-white dark:bg-gray-600 flex justify-center items-center transition duration-1000  w-full h-full">
          <div className="font-bold dark:text-white">
            выберите пользователя
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
