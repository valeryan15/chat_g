import React, { useState } from 'react'
import WroteMessage from './WroteMessage'

const Message = (props) => {
  let state = props.dialogsPage
  let [newMessage, setMessage] = useState(() => {
    if (state.chats.length) {
      return state.chats[0].message || ''
    }
    return ''
  })
  const sendMessage = () => {
    props.sendMessage(newMessage)
    setMessage(state.chats[0].message)
  }

  const onMessageChange = (e) => {
    setMessage(e.target.value)
  }

  let messageElement = state.chats.map((m) => (
    <WroteMessage mess={m.message} key={m.id} />
  ))
  return (
    <div className="min-h-full flex flex-col">
      <div className="dark:text-white transition duration-1000 w-full min-h-0 border-r-2 border-b-2 border-slate-200 ">
        header
      </div>
      <div className="dark:text-white flex-auto transition duration-1000 ">
        <div className="ml-24 bg-gray-200 w-1/3 my-4 p-2 rounded-lg dark:bg-black">
          message from friend
        </div>
        <div className="float-right p-2 w-1/3 ">{messageElement}</div>
      </div>
      <div className="dark:text-white mb-12 flex transition duration-1000">
        <textarea
          className=" ml-24  border-2 border-slate-200 transition duration-100 w-full dark:bg-gray-800 dark:text-white"
          placeholder="Введите текст"
          value={newMessage}
          onChange={onMessageChange}
        />
        <button
          className="mr-24 dark:text-white"
          onClick={sendMessage}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Message
