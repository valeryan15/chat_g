import { connect } from 'react-redux'
import Footer from './Footer.tsx'
import {Messages} from "../../redux/dialogsReducer";
import {FC} from "react";
import {AppState} from "../../redux/redux-store";

type Props = {
  sumMessages: number
  chats: Array<Messages>
  isAuth: boolean
}
const FooterContainer:FC<Props> = (props) => {
  return <Footer sumMessages={props.sumMessages} {...props} />
}
const mapStateToProps = (state: AppState): Props => ({
  chats: state.dialogs.chats,
  sumMessages: state.dialogs.sumMessages,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(FooterContainer)
