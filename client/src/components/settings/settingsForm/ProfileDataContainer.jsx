import ProfileData from './ProfileData'
import { connect } from 'react-redux'
import React from 'react'
import { namePhoneChangeAction } from '../../../redux/settingsReducer'

class ProfileDataContainer extends React.Component {
  render() {
    return <ProfileData {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  name: state.settings.name,
  phone: state.settings.phone,
})

const mapDispatchToProps = (dispatch) => ({
  sendNamePhone: (newName, newPhone) => {
    dispatch(namePhoneChangeAction(newName, newPhone))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDataContainer)
