import { connect } from 'react-redux'
import React from 'react'
import Users from './users'
import { Navigate } from 'react-router-dom'
import { getUsersThunk } from '../../redux/usersReducer'

class UsersContainer extends React.Component {
  componentDidMount() {
    getUsersThunk()
  }

  render() {
    if (!this.props.isToken) {
      return <Navigate to="/login" />
    }

    return <Users {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  isToken: state.settings.isToken,
  users: state.users.users,
})

export default connect(mapStateToProps)(UsersContainer)
