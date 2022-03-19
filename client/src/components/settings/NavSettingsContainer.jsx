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
  name: state.settings.settingsNamePhone.name,
  phone: state.settings.settingsNamePhone.phone,
})

export default connect(mapStateToProps)(NavSettingsContainer)