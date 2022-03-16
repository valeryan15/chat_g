import ProfileData from "./ProfileData";
import {connect} from "react-redux";
import React from "react";
import {phoneDataAC, profileDataAC,} from "../../../redux/settingsReducer";

class ProfileDataContainer extends React.Component {
  render() {
    return <ProfileData {...this.props}/>
  }
}

const mapStateToProps = (state) => ({
  nameData: state.settings.nameData,
  phoneData: state.settings.phoneData
})

const mapDispatchToProps = (dispatch) => ({
  sendName: (newName) => {
    dispatch(profileDataAC(newName))
  },
  sendPhone: (newPhone) => {
    dispatch(phoneDataAC(newPhone))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDataContainer)