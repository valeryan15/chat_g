import ProfileData from './ProfileData.tsx'
import { connect } from 'react-redux'
import * as React from 'react'
import { updateInfoThunk } from '../../../redux/settingsReducer.ts'
import {FC} from "react";
import {AppState} from "../../../redux/redux-store.ts";

type MapStateToProps = {
  id: string
}
type MapDispatchToProps = {
  updateInfoThunk: any
}
type OwnProps = {
}
type Props = MapStateToProps & MapDispatchToProps & OwnProps

const ProfileDataContainer: FC<Props> = (props) => {
  const onSubmit = ( formData) => {
    props.updateInfoThunk({...formData, id: props.id })
  }
  return <ProfileData onSubmit={onSubmit} {...props} />
}

const mapStateToProps = (state: AppState):MapStateToProps => ({
  id: state.settings.id
})

export default connect(mapStateToProps, { updateInfoThunk })(
  ProfileDataContainer
)
