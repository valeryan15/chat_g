import AuthForm from './AuthForm'
import { connect } from 'react-redux'
import { authThunk, toggleIsFetching } from '../redux/authReducer'

const Auth = (props) => {
  const onSubmit = (formData) => {
    props.authThunk(
      formData.login,
      formData.password,
      formData.passwordConfirmation
    )
  }

  return (
    <AuthForm onSubmit={onSubmit} isFetching={props.isFetching} />
  )
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
  }
}

export default connect(mapStateToProps, {
  authThunk,
  toggleIsFetching,
})(Auth)
