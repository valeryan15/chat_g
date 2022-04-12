import AuthForm from './AuthForm'
import { connect } from 'react-redux'
import {
  registrationThunk,
  toggleIsFetching,
} from '../redux/authReducer'

const Auth = (props) => {
  const onSubmit = (formData) => {
    props.registrationThunk({
      ...formData,
    })
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
  registrationThunk,
  toggleIsFetching,
})(Auth)
