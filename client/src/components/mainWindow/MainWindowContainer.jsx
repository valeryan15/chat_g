import React from 'react'
import MainWindow from "./MainWindow";
import {connect} from "react-redux";

const MainWindowContainer = (props) => {
  return (
    <MainWindow {...props} />
  )
}
const mapStateToProps = (state) => ({
  mainWindowBackgroundColor: state.settings.mainWindowBackgroundColor,
  textColor: state.settings.textColor,
})
export default connect(mapStateToProps)(MainWindowContainer)
