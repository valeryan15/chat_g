import * as React from 'react'
import { connect } from 'react-redux'
import Header from './Header.tsx'
import {logoutThunk} from "../../redux/authReducer.ts";
import {AppState} from "../../redux/redux-store";
type Props = {
  isAuth: boolean
  login: string
}
class HeaderContainer extends React.Component<Props> {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state: AppState) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect(mapStateToProps, {logoutThunk})(HeaderContainer)
