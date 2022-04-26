import Dialog from './Dialog'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { getChatsThunk } from '../../../redux/dialogsReducer'

const DialogContainer = (props) => {
  useEffect(() => {
    props.getChatsThunk()
  }, [])

  return <Dialog {...props} />
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats,
})

export default connect(mapStateToProps, { getChatsThunk })(
  DialogContainer
)
