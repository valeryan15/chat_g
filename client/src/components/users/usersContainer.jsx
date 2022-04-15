import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import Users from './users'
import { getUsersThunk } from '../../redux/usersReducer'
import { createChatThunk } from '../../redux/dialogsReducer'

const UsersContainer = (props) => {
  useEffect(() => {
    props.getUsersThunk()
  }, [])

  const createChat = (userId) => {
    props.createChatThunk(userId)

  }

  return <Users createChat={createChat} {...props} />
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  users: state.users.users,
  toggleAddChat: state.dialogsPage.toggleAddChat,
})

export default connect(mapStateToProps, {
  getUsersThunk,
  createChatThunk,
})(UsersContainer)
