import { authAPI } from '../api/api'
import {setToken} from "../components/login/token";
const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

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

export const authorizationThunk = (login, password) => (dispatch) => {
  console.log('попали в login')
  dispatch(toggleIsFetching(true))
  authAPI
    .authorization(login, password)
    .then((response) => {
      dispatch(toggleIsFetching(false))
      const { login, token } = response
      setToken(token)
      dispatch(getInfoThunk(login))
    })
    .catch(dispatch(toggleIsFetching(false)))
}

export const getInfoThunk = (login) => (dispatch) => {
  console.log('попали в getInfo')
  authAPI.getInfo(login).then(() => {
    dispatch(toggleIsFetching(false))
    dispatch(setAuthUserData(login, true))
  })
}
// export const logoutThunk = () => (dispatch) => {
//     authAPI.logout()
//         .then(response => {
//             if (response.status === 200) {
//                 let {login} = response.data
//                 dispatch(setAuthUserData(null, false))
//             }
//         })
// }
export const registrationThunk =
  (login, password, passwordConfirmation) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    authAPI
      .registration(login, password, passwordConfirmation)
      .then(() => {
        dispatch(toggleIsFetching(false))
        // dispatch(loginThunk(response.login, response.password))    //Валер, пока не знаю надо ли передавать данные в логин
      })
      .catch(() => dispatch(toggleIsFetching(false)))
  }

export default authReducer