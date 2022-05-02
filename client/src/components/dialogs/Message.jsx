import React, { useState } from 'react'
import WroteMessage from './WroteMessage'

const Message = (props) => {
  console.log(props.isEditMessage)
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

  const editMessage = () => {
    props.changeEditMessage()
  }

  let messageElement = props.messages.map((m) => (
    <WroteMessage
      editMessage={editMessage}
      id={props.userId}
      mess={m.message}
      time={m.timestamp}
      userId={m.user.id}
      key={m.id}
      messId={m.id}
    />
  ))
  return (
    <div className="min-h-full flex flex-col">
      <div className="dark:text-white transition duration-1000 w-full min-h-0 border-r-2 border-b-2 border-slate-200 text-center ">
        header
      </div>
      <div className="dark:text-white transition duration-1000 overflow-auto ">
        <div className="w-full max-h-[700px]">{messageElement}</div>
      </div>
      <div className="dark:text-white mb-2 flex transition duration-1000 absolute w-[70%] bottom-0">
        <textarea
          className=" ml-24 mt-4 border-2 border-slate-200 transition duration-100 w-[75%] dark:bg-gray-800 dark:text-white"
          placeholder="Введите текст"
          value={!props.isEditMessage ? newMessage : 'messId'}
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
