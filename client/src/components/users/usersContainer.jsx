import { connect } from 'react-redux'
import React from 'react'
import Users from './users'
import { Navigate } from 'react-router-dom'
import { getUsersThunk } from '../../redux/usersReducer'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunk()
  }

  render() {
    if (!this.props.isAuth) {
      return <Navigate to="/login" />
    }
    return <Users {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  users: state.users.users,
})

export default connect(mapStateToProps, {getUsersThunk})(UsersContainer)
