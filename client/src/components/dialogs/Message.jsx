import React from 'react'
import WroteMessage from './WroteMessage'

const Message = (props) => {
  let newMessage = props.message
  let messId = props.editMessId

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
        {props.dialogName}
      </div>
      <div className="dark:text-white transition duration-1000 overflow-auto ">
        <div className="w-full max-h-[700px]">{messageElement}</div>
      </div>
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

export default Message
