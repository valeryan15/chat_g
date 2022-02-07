import LoginForm from './loginForm'
import { connect } from 'react-redux'
import { loginThunk, toggleIsFetching } from '../../redux/authReducer'

const Login = (props) => {
  const onSubmit = (formData) => {
    props.loginThunk(formData.login, formData.password)
  }

  return (
    <LoginForm onSubmit={onSubmit} isFetching={props.isFetching} />
  )
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  isFetching: state.auth.isFetching,
})

export default connect(mapStateToProps, {
  loginThunk,
  toggleIsFetching,
})(Login)
