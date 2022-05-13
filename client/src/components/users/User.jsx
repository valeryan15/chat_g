import React from 'react'
import preloader from '../../img/785.gif'
import { Link } from 'react-router-dom'

const User = (props) => {
  const addUserIdDialog = () => {
    props.createChat(props.id)
  }

  return (
    <div>
      <div className="changeButton text-left px-8 py-2 flex justify-between">
        {props.login}
        {!props.chatExist ? (
          <button
            onClick={addUserIdDialog}
            className="hover:bg-blue-200 transition duration-1000 dark:hover:bg-blue-900 rounded-lg px-4"
            disabled={props.toggleAddChat}
          >
            <span className="flex justify-between">
              {props.toggleAddChat ? (
                <span>
                  добавление...
                  <img
                    src={preloader}
                    alt={'preloader'}
                    className="w-6 ml-2 float-right"
                  />
                </span>
              ) : (
                <span>добавить в чат</span>
              )}
            </span>
          </button>
        ) : (
          <span className="bg-blue-200 transition duration-1000 dark:bg-blue-800 dark:hover:bg-blue-900 rounded-lg px-4">
            <Link to={`/main/chatWindow/`}>перейти в чаты</Link>
          </span>
        )}
      </div>
    </div>
  )
}

export default User
