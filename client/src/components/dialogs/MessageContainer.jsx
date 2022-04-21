import Message from './Message'
import { connect } from 'react-redux'
import { getChatThunk } from '../../redux/messageReducer'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const MessageContainer = (props) => {
  let { chat_id } = useParams()

  useEffect(() => {
    props.getChatThunk(chat_id)
  }, [chat_id])

  return <Message {...props} />
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats,
})

export default connect(mapStateToProps, { getChatThunk })(
  MessageContainer
)
