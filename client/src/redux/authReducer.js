import { authAPI } from '../api/api'
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

export const loginThunk = (login, password) => (dispatch) => {
  dispatch(toggleIsFetching(true))
  authAPI.login(login, password).then((response) => {
    console.log('response login success')
    if (response.status === 200) {
      dispatch(toggleIsFetching(false))
      let { login } = response.data
      dispatch(setAuthUserData(login, true))
    }
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
export const authThunk =
  (login, password, passwordConfirmation) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    authAPI
      .auth(login, password, passwordConfirmation)
      .then((response) => {
        console.log('success')
        dispatch(toggleIsFetching(false))
        if (response.status === 200) {
          dispatch(loginThunk(login, password))
        }
      })
  }

export default authReducer

