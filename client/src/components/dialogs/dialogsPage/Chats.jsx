import React from 'react'
import { Link } from 'react-router-dom'
import ChatUsers from './ChatUsers'

const Chats = (props) => {
  const setDialogName = (dialogName) => {
    props.setDialogName(dialogName)
  }

  let userElement = props.chats.map((d) => (
    <Link to={`/main/chatWindow/${d.id}`} key={d.id}>
      <ChatUsers setDialogName={setDialogName} name={d.name} newMessages={d.countNewMessages}/>
    </Link>
  ))
  return (
    <div>
      {userElement}
    </div>
  )
}

export default Chats
