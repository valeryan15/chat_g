
import {connect} from "react-redux";
import Footer from "./Footer";

const FooterContainer = (props) => {
  return (
    props.chats.map(m => <Footer newMess={m.countNewMessages} key={m.id}/>)

  )
}

const mapStateToProps = (state) => ({
  chats: state.dialogs.chats
})

export default connect(mapStateToProps)(FooterContainer)
