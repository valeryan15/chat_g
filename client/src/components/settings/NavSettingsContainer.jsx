import React from "react";
import NavSettings from "./NavSettings";
import {connect} from "react-redux";


class NavSettingsContainer extends React.Component {
  render() {
    return <NavSettings {...this.props}/>
  }
}

const mapStateToProps = (state) => ({
  login: state.auth.login,
  nameData: state.settings.settingsNamePhone.nameData,
  phoneData: state.settings.settingsNamePhone.phoneData,
})

export default connect(mapStateToProps)(NavSettingsContainer)