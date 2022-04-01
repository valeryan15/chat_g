import React from 'react'
import TypeTheme from './TypeTheme'
import {updateThemeThunk} from "../../redux/settingsReducer";
import {connect} from "react-redux";


const TypeThemeContainer = (props) => {
  const sendTheme = ( theme) => {
    props.updateThemeThunk(props.id, theme)
  }
  return <TypeTheme sendTheme = {sendTheme} {...props} />
}

const mapStateToProps = (state) => ({
  id: state.settings.settings.id
})



export default connect(mapStateToProps, {updateThemeThunk})(TypeThemeContainer)
