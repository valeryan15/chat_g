import Dialog from "./Dialog";
import {connect} from "react-redux";


const DialogContainer = (props) => {
  return <Dialog {...props }/>
}

const mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage
})

export default connect(mapStateToProps) (DialogContainer)