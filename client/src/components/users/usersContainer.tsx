import { connect } from 'react-redux'
import * as React from 'react'
import { getUsersThunk } from '../../redux/usersReducer.ts'
import { createChatThunk } from '../../redux/dialogsReducer.ts'
import {FC, useEffect} from 'react'
import {UsersType} from '../../redux/usersReducer'
import Users from '../users/Users'
import {AppState} from "../../redux/redux-store";

type MapStateToProps = {
  isAuth: boolean
  toggleAddChat: boolean
  users: Array<UsersType>
}
type MapDispatchToProps = {
  getUsersThunk: any
  createChatThunk: any
}
type OwnProps = {

}
type Props = MapStateToProps & MapDispatchToProps & OwnProps
const UsersContainer:FC<Props> = (props) => {
  useEffect(() => {
    props.getUsersThunk()
  }, [])

  const createChat = (userId) => {
    props.createChatThunk(userId)

  }

  return <Users createChat={createChat} {...props} />
}

const mapStateToProps = (state):MapStateToProps => ({
  isAuth: state.auth.isAuth,
  users: state.users.users,
  toggleAddChat: state.dialogs.toggleAddChat,
})

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, AppState>(mapStateToProps, {
  getUsersThunk,
  createChatThunk,
})(UsersContainer)
