import {connect} from 'react-redux'
import React, {useEffect} from 'react'
import Users from './users'
import {getUsersThunk} from '../../redux/usersReducer'
import {setUserAction} from "../../redux/dialogsReducer";

const UsersContainer = (props) => {
  useEffect( () => {
    props.getUsersThunk()
  }, [])

  const setUser = (id, login) => {
    return setTimeout(() => {
      props.setUserAction(id, login)
    },500)

  }

  return <Users setUser={setUser} {...props} />
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  users: state.users.users,
  toggleAddUser: state.dialogsPage.toggleAddUser,
  addInProgress: state.dialogsPage.addInProgress
})

export default connect(mapStateToProps, {getUsersThunk, setUserAction})(UsersContainer)
