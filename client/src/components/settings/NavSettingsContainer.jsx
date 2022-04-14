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
  name: state.settings.name,
  phone: state.settings.phone,
})

export default connect(mapStateToProps)(NavSettingsContainer)