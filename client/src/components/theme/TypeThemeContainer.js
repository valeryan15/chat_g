import React from 'react'
import TypeTheme from './TypeTheme'
import {connect} from "react-redux";

const TypeThemeContainer = (props) => {
  return <TypeTheme {...props}/>
}
const mapStateToProps = (state) => ({
  isChangeTheme: state.settings.isChangeTheme
})
export default connect(mapStateToProps)(TypeThemeContainer)
