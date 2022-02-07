import { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
})

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) {
        return <Component {...this.props} />
      }
    }
  }

  const ConnectedAuthRedirectComponent = connect(
    mapStateToPropsForRedirect
  )(RedirectComponent)
  return ConnectedAuthRedirectComponent
}
