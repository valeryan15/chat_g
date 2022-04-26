import React, { useState } from 'react'
import WroteMessage from './WroteMessage'

const Message = (props) => {
  let [newMessage, setMessage] = useState(() => {
    if (props.chats.length) {
      return props.chats.message || ''
    }
    return ''
  })

  const sendMessage = () => {
    props.addMessage(newMessage)
    setMessage('')
  }

  const onMessageChange = (e) => {
    setMessage(e.target.value)
  }

  let messageElement = props.messages.map((m) => (
    <WroteMessage
      id={props.userId}
      mess={m.message}
      time={m.timestamp}
      userId={m.user.id}
      key={m.id}
    />
  ))
  return (
    <div className="min-h-full flex flex-col">
      <div className="dark:text-white transition duration-1000 w-full min-h-0 border-r-2 border-b-2 border-slate-200 text-center ">
        header
      </div>
      <div className="dark:text-white flex-auto transition duration-1000 ">
        <div className="w-full ml-24">{messageElement}</div>
      </div>
      <div className="dark:text-white mb-2 flex transition duration-1000">
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
