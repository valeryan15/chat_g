import React, { useEffect } from 'react'
import WroteMessage from './WroteMessage'
import arrowDown from '../../img/angle-arrow-down_icon-icons.com_73683.svg'

const Messages = (props) => {
  console.log(props.messages)
  useEffect(() => {
    scrollToBottom()
    if (props.loadedMessagePage) {
      let unreadMessages = props.messages.filter(
        (m) => m.user.id !== props.userId && !m.read[props.login]
      )
      if (unreadMessages.length) {
        props.readMessage(unreadMessages)
      }
    }
  }, [props.loadedMessagePage])

  let newMessage = props.message
  let messId = props.editMessId
  let messageEnd = props.messageEnd

  const sendMessage = () => {
    props.addMessage(newMessage)
  }
  const onMessageChange = (e) => {
    props.setNewMessage(e.target.value)
  }
  const editMessage = (editMessage, editMessId) => {
    props.changeEditMessage(editMessage, editMessId)
  }
  const sendEditMessage = () => {
    props.addEditMessage(newMessage, messId)
  }
  const cancelEditMode = () => {
    props.cancelEditMode()
  }
  const readMessage = (messages) => {
    props.readMessage(messages)
  }
  const scrollToBottom = () => {
    messageEnd.scrollIntoView({ behavior: 'smooth' })
  }

  let messageElement = props.messages.map((m) => (
    <WroteMessage
      readMessage={readMessage}
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
        {props.dialogName}
      </div>
      <div className="dark:text-white transition duration-1000 overflow-auto ">
        <div className="min-w-[10%] max-h-[700px]">
          {messageElement}
        </div>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            messageEnd = el
          }}
        />
      </div>
      {props.messages.length ? (
        <button
          onClick={scrollToBottom}
          className="w-8 p-2 fixed bottom-[10%] right-[17%] rounded-full bg-gray-200 dark:bg-white"
        >
          <img src={arrowDown} alt="arrowDown" />
        </button>
      ) : null}
      <div className="dark:text-white mb-2 flex transition duration-1000 absolute w-[70%] bottom-0">
        <textarea
          className=" ml-24 mt-4 border-2 border-slate-200 transition duration-100 w-[75%] dark:bg-gray-800 dark:text-white"
          placeholder="Введите текст"
          value={newMessage}
          onChange={onMessageChange}
        />
        <div className=" mt-4 ml-2">
          <button
            className="mr-24 dark:text-white rounded-lg bg-gray-200 dark:bg-gray-600"
            onClick={
              !props.isEditMessage ? sendMessage : sendEditMessage
            }
          >
            Submit
          </button>
          {props.isEditMessage ? (
            <button
              className="text-black dark:text-white text-xs rounded-lg px-2  bg-red-200 dark:bg-red-600 transition duration-100"
              onClick={cancelEditMode}
            >
              отмена
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Messages
