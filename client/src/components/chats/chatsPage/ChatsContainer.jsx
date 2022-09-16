import { connect } from 'react-redux'
import { useEffect } from 'react'
import {
  getChatsThunk,
  setDialogNameAction,
} from '../../../redux/dialogsReducer.ts'
import Chats from "./Chats";

const ChatsContainer = (props) => {
  useEffect(() => {
    props.getChatsThunk()
  }, [])

  const setDialogName = (dialogName) => {
    props.setDialogNameAction(dialogName)
  }

  return <Chats setDialogName={setDialogName} {...props} />
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats,
  dialogName: state.dialogs.dialogName
})

export default connect(mapStateToProps, {
  getChatsThunk,
  setDialogNameAction,
})(ChatsContainer)
