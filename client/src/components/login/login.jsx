import LoginForm from './loginForm'
import { connect } from 'react-redux'
import {
  authorizationThunk,
  toggleIsFetching,
} from '../../redux/authReducer'
import {Navigate} from "react-router-dom";


const Login = (props) => {

  const onSubmit = (formData) => {
    props.authorizationThunk({...formData})
  }
  if(props.isAuth) {
    return <Navigate to='/main' />
  }

  return (
    <LoginForm onSubmit={onSubmit} isFetching={props.isFetching} />
  )
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
  }
}

export default connect(mapStateToProps, {
  authorizationThunk,
  toggleIsFetching,
})(Login)
