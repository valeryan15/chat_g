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
  name: state.settings.settings.name,
  phone: state.settings.settings.phone,
})

export default connect(mapStateToProps)(NavSettingsContainer)