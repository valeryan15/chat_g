import { connect } from 'react-redux'
import Footer from './Footer'

const FooterContainer = (props) => {
  return <Footer sumMessages={props.sumMessages} {...props}/>
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats,
  sumMessages: state.dialogs.sumMessages,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(FooterContainer)
