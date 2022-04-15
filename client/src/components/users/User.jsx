import React from 'react'
import preloader from '../../img/785.gif'

const User = (props) => {
  console.log(props.toggleAddChat)
  const addUserIdDialog = () => {
    props.createChat(props.id)
  }

  return (
    <div>
      <div className="changeButton text-left px-8 py-2 flex justify-between">
        {props.login}
        <button
          onClick={addUserIdDialog}
          className="hover:bg-blue-200 transition duration-1000 dark:hover:bg-blue-900 rounded-lg px-4"
          disabled={props.toggleAddChat}
        >
          <span className="flex justify-between">
            {props.toggleAddChat && <span>добавление...</span>}
            {props.toggleAddChat && (
              <img
                src={preloader}
                alt={'preloader'}
                className="w-6 ml-2"
              />
            )}
            {!props.toggleAddChat && <span>добавить в чат</span>}
          </span>
        </button>
      </div>
    </div>
  )
}

export default User
