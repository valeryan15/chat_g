
import {Navigate, useLocation} from 'react-router-dom'
import {connect} from "react-redux";

const RequireAuth = ({ children, ...props }) => {
  const location = useLocation()
  return props.isAuth === true ? children : <Navigate to='/login' replace state={{ path: location.pathname }} />
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(RequireAuth)