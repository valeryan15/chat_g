import React, { useEffect } from 'react'
import WroteMessage from './WroteMessage'
import arrowDown from '../../img/angle-arrow-down_icon-icons.com_73683.svg'
import m from '../../css/message.module.css'

const Messages = (props) => {
  let disabled = props.isFormDisabled
  let newMessage = props.message
  let messId = props.editMessId
  let messageEnd = props.messageEnd

  useEffect(() => {
    if (props.loadedMessagePage) {
      let unreadMessages = props.messages.filter(
        (m) => m.user.id !== props.userId && !m.read[props.login]
      )
      if (unreadMessages.length) {
        props.readMessage(unreadMessages)
      }
      setTimeout(() => scrollToBottom(), 300)
    }
  }, [props.loadedMessagePage])
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
  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      onSubmitForm(e)
    }
  }
  const onSubmitForm = (e) => {
    e.preventDefault()
    if (!props.isEditMessage) {
      sendMessage()
    } else {
      sendEditMessage()
    }
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
    <div className="h-full flex flex-col">
      <div className="dark:text-white transition duration-1000 w-full border-r-[1px] border-b-[1px] border-gray-500 text-center ">
        {props.dialogName}
      </div>
      <div className= {`dark:text-white transition duration-1000 overflow-auto ${m.messageContent}`}>
        <div className={m.currentUserMessage}>{messageElement}</div>
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
          className="w-8 p-2 fixed bottom-[10%] mb-2 right-[10px] rounded-full bg-gray-200 dark:bg-white"
        >
          <img src={arrowDown} alt="arrowDown" />
        </button>
      ) : null}
      <form
        onSubmit={onSubmitForm}
        onKeyDown={onKeyPress}
        className="dark:text-white flex transition duration-1000  mt-[2px]"
      >
        <textarea
          className="border-y-[1px] h-[86px] w-full pl-2 pr-[80px] border-gray-500 transition duration-100 dark:bg-gray-700 dark:text-white"
          placeholder="Введите текст"
          value={newMessage}
          onChange={onMessageChange}
          disabled={disabled}
        />
        <button
          type="Submit"
          className="dark:text-white border-y-[1px] border-gray-500 w-[70px] bg-gray-200 dark:bg-gray-800"
        >
          Submit
        </button>
        {props.isEditMessage ? (
          <button
            className="text-black dark:text-white text-xs px-2 border-y-[1px] border-gray-500 bg-red-200 dark:bg-red-600 transition duration-100"
            onClick={cancelEditMode}
          >
            отмена
          </button>
        ) : null}
      </form>
    </div>
  )
}

export default Messages
