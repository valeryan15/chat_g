import * as React from "react";
import NavSettings from "./NavSettings.tsx";
import {connect} from "react-redux";
import {AppState} from "../../redux/redux-store";

type Props = {
  login: string
  name: string
  phone: string

}
class NavSettingsContainer extends React.Component<Props> {
  render() {
    return <NavSettings {...this.props}/>
  }
}

const mapStateToProps = (state: AppState):Props => ({
  login: state.auth.login,
  name: state.settings.name,
  phone: state.settings.phone,
})

export default connect(mapStateToProps)(NavSettingsContainer)