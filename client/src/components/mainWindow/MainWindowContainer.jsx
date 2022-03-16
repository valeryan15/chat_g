import React from 'react'
import MainWindow from "./MainWindow";
import {connect} from "react-redux";

const MainWindowContainer = (props) => {
  return (
    <MainWindow {...props} />
  )
}
const mapStateToProps = () => ({
})
export default connect(mapStateToProps)(MainWindowContainer)
