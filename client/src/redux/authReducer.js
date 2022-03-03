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

const setToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token))
}


export const setAuthUserData = (login, token, isAuth) => ({
  type: SET_USER_DATA,
  payload: { login, token, isAuth },
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
      dispatch(getInfoThunk(login, token))
    })
    .catch(dispatch(toggleIsFetching(false)))
}

export const getInfoThunk = (login, token) => (dispatch) => {
  console.log('попали в auth')
  authAPI.getInfo(login, token).then(() => {
    dispatch(toggleIsFetching(false))
    dispatch(setAuthUserData(login, token, true))
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
