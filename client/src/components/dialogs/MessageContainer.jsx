import Message from './Message'
import { connect } from 'react-redux'
import { newMessageAC } from '../../redux/dialogsReducer'
import React from "react";

class MessageContainer extends React.Component {
  render() {
    return <Message {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage,
})
const mapDispatchToProps = (dispatch) => ({
  sendMessage: (newMessage) => dispatch(newMessageAC(newMessage)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer)
