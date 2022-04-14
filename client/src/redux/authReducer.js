import { authAPI } from '../api/api'
import { removeToken, setToken } from '../components/login/token'
import { getUserThunk } from './settingsReducer'
const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH'

const initialState = {
  userId: null,
  login: null,
  isAuth: false,
  isFetching: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case TOGGLE_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      }

    default:
      return state
  }
}

export const setAuthUserData = (login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { login, isAuth },
})

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
export const toggleIsAuth = (isAuth) => ({
  type: TOGGLE_IS_AUTH,
  isAuth,
})

export const authorizationThunk = (login, password) => (dispatch) => {
  dispatch(toggleIsFetching(true))
  authAPI
    .authorization(login, password)
    .then((response) => {
      dispatch(toggleIsFetching(false))
      const { token } = response
      setToken(token)
      dispatch(getUserThunk())
    })
    .catch(() => dispatch(toggleIsFetching(false)))
}

export const logoutThunk = () => (dispatch) => {
  authAPI.logout().then(() => {
    removeToken()
    dispatch(setAuthUserData(null, false))
  })
}

export const registrationThunk =
  (login, password, passwordConfirmation) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    authAPI
      .registration(login, password, passwordConfirmation)
      .then(() => {
        dispatch(toggleIsFetching(false))
      })
      .catch(() => dispatch(toggleIsFetching(false)))
  }

export default authReducer
