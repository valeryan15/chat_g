import ProfileData from "./ProfileData";
import {connect} from "react-redux";
import React from "react";
import {phoneDataAC, profileDataAC, updatePhoneDataAC, updateProfileDataAC} from "../../../redux/settingsReducer";

class ProfileDataContainer extends React.Component {
  render() {
    return <ProfileData {...this.props}/>
  }
}

const mapStateToProps = (state) => ({
  newNameDataText: state.settings.newNameDataText,
  newPhoneDataText: state.settings.newPhoneDataText
})

const mapDispatchToProps = (dispatch) => ({
  onChangeNameData: (body) => {
    dispatch(updateProfileDataAC(body))
  },
  sendProfileData: (profileData) => {
    dispatch(profileDataAC(profileData))
  },
  sendPhoneData: (phoneData) => {
    dispatch(phoneDataAC(phoneData))
  },
  onChangePhoneData: (body) => {
    dispatch(updatePhoneDataAC(body))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDataContainer)