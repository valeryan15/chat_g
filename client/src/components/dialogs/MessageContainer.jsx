import Message from './Message'
import { connect } from 'react-redux'
import { newMessageAction } from '../../redux/dialogsReducer'
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
  sendMessage: (newMessage) => dispatch(newMessageAction(newMessage)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer)
