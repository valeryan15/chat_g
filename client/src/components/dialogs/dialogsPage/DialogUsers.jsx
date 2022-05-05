import React from 'react'

const DialogUsers = (props) => {
  const changeDialog = () => {
    props.setDialogName(props.name)
  }

  return (
    <button
      onClick={changeDialog}
      className="buttonChangeFriendDialog flex justify-between pr-4"
    >
      <div className="ml-4">{props.name}</div>
      {props.newMessages ? `новых: ${props.newMessages} ` : null}
    </button>
  )
}

export default DialogUsers
