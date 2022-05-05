import Message from './Message'
import { connect } from 'react-redux'
import {
  addEditMessageThunk,
  addMessageThunk,
  cancelEditModeAction,
  editMessageAction,
  getChatThunk,
  updateMessageAction,
} from '../../redux/messageReducer'
import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const MessageContainer = (props) => {
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
    props.addEditMessageThunk(chat_id, messId, newMessage)
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

  return (
    <Message
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
  isEditMessage: state.message.isEditMessage,
  message: state.message.message,
  editMessId: state.message.editMessId,
  dialogName: state.dialogs.dialogName,
})

export default connect(mapStateToProps, {
  getChatThunk,
  addMessageThunk,
  editMessageAction,
  updateMessageAction,
  addEditMessageThunk,
  cancelEditModeAction,
})(MessageContainer)
