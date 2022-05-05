import React from 'react'
import { Link } from 'react-router-dom'
import DialogUsers from './DialogUsers'

const Dialog = (props) => {
  const setDialogName = (dialogName) => {
    props.setDialogName(dialogName)
  }

  let userElement = props.chats.map((d) => (
    <Link to={`/main/chatWindow/${d.id}`} key={d.id}>
      <DialogUsers setDialogName={setDialogName} name={d.name} newMessages={d.countNewMessages}/>
    </Link>
  ))
  return (
    <div>
      {userElement}
    </div>
  )
}

export default Dialog
