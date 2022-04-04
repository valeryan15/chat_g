import ProfileData from './ProfileData'
import { connect } from 'react-redux'
import React from 'react'
import { updateInfoThunk } from '../../../redux/settingsReducer'

const ProfileDataContainer = (props) => {
  const onSubmit = ( formData) => {
    props.updateInfoThunk(props.id, formData.name, formData.phone)
  }
  return <ProfileData onSubmit={onSubmit} {...props} />
}

const mapStateToProps = (state) => ({
  id: state.settings.id
})

export default connect(mapStateToProps, { updateInfoThunk })(
  ProfileDataContainer
)
