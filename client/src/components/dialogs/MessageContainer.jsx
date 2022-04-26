import Message from './Message'
import { connect } from 'react-redux'
import {
  addMessageThunk,
  getChatThunk,
} from '../../redux/messageReducer'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const MessageContainer = (props) => {
  let { chat_id } = useParams()

  useEffect(() => {
    props.getChatThunk(chat_id)
  }, [chat_id])

  const addMessage = ( newMessage) => {
    props.addMessageThunk(chat_id, newMessage)
  }

  return <Message addMessage={addMessage} {...props} />
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats,
  messages: state.message.messages,
  userId: state.auth.userId
})

export default connect(mapStateToProps, {
  getChatThunk,
  addMessageThunk,
})(MessageContainer)
