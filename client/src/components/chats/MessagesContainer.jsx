import Messages from './Messages'
import { connect } from 'react-redux'
import {
  addMessageThunk,
  cancelEditModeAction,
  editMessageAction,
  editMessageThunk,
  getChatThunk,
  readMessageThunk,
  updateMessageAction,
} from '../../redux/messagesReducer'
import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const MessagesContainer = (props) => {
  let { chat_id } = useParams()

  useEffect(() => {
    if (chat_id) {
      props.getChatThunk(chat_id)
    } else {
      return <Navigate to={'/main'} />
    }
  }, [chat_id])

  const addMessage = (newMessage) => {
    props.addMessageThunk(chat_id, newMessage)
  }
  const addEditMessage = (newMessage, messId) => {
    props.editMessageThunk(chat_id, messId, newMessage)
  }
  const changeEditMessage = (editMessage, editMessId) => {
    props.editMessageAction(editMessage, editMessId)
  }
  const cancelEditMode = () => {
    props.cancelEditModeAction()
  }
  const setNewMessage = (newMessage) => {
    props.updateMessageAction(newMessage)
  }
  const readMessage = (messages) => {
    props.readMessageThunk(chat_id, messages)
  }

  return (
    <Messages
      readMessage={readMessage}
      cancelEditMode={cancelEditMode}
      addEditMessage={addEditMessage}
      addMessage={addMessage}
      changeEditMessage={changeEditMessage}
      setNewMessage={setNewMessage}
      {...props}
    />
  )
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats,
  messages: state.message.messages,
  userId: state.auth.userId,
  login: state.auth.login,
  isEditMessage: state.message.isEditMessage,
  message: state.message.message,
  editMessId: state.message.editMessId,
  dialogName: state.dialogs.dialogName,
  messageEnd: state.message.messageEnd,
  loadedMessagePage: state.message.loadedMessagePage,
  isFormDisabled: state.message.isFormDisabled
})

export default connect(mapStateToProps, {
  getChatThunk,
  addMessageThunk,
  editMessageAction,
  updateMessageAction,
  editMessageThunk,
  cancelEditModeAction,
  readMessageThunk,
})(MessagesContainer)
