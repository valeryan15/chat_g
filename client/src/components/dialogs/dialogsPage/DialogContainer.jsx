import Dialog from './Dialog'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import {
  getChatsThunk,
  setDialogNameAction,
} from '../../../redux/dialogsReducer'

const DialogContainer = (props) => {
  useEffect(() => {
    props.getChatsThunk()
  }, [])

  const setDialogName = (dialogName) => {
    props.setDialogNameAction(dialogName)
  }

  return <Dialog setDialogName={setDialogName} {...props} />
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats,
})

export default connect(mapStateToProps, {
  getChatsThunk,
  setDialogNameAction,
})(DialogContainer)
