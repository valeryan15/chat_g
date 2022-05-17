import React from 'react'

const changeDialogFriend =
  'buttonChangeFriendDialog bg-gray-200 dark:bg-gray-800'

const ChatUsers = (props) => {
  const changeDialog = () => {
    props.setDialogName(props.name)
  }

  return (
    <button
      onClick={changeDialog}
      className={
        props.name === props.chatName
          ? changeDialogFriend
          : 'buttonChangeFriendDialog'
      }
    >
      <div className="ml-4">{props.name}</div>
      {props.newMessages ? `новых: ${props.newMessages} ` : null}
    </button>
  )
}

export default ChatUsers
