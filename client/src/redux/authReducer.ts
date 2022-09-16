import { authAPI } from '../api/api.ts'
import { removeToken, setToken } from '../components/login/token'
import { getUserThunk } from './settingsReducer.ts'
import {toast} from "react-toastify";
import {ThunkAction} from "redux-thunk";
import {AppState} from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'


export type InitialState  = {
  userId: string | null,
  login: string | null,
  isAuth: boolean,
  isFetching: boolean,
}
const initialState: InitialState = {
  userId: null,
  login: null,
  isAuth: false,
  isFetching: false,
}

const authReducer = (state = initialState, action: Actions): InitialState => {
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
type Payload = {
  userId: string | null
  login: string| null
  isAuth: boolean
}
type Actions = SetAuthUserData | ToggleIsFetching
type SetAuthUserData = {
  type: typeof SET_USER_DATA
  payload: Payload
}
type ToggleIsFetching = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
type Thunk = ThunkAction<Promise<void>, AppState, unknown, Actions>

export const setAuthUserData = (userId: string, login: string, isAuth: boolean): SetAuthUserData => ({
  type: SET_USER_DATA,
  payload: {userId, login, isAuth },
})
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})


export const authorizationThunk = (login: string | null, password: string): Thunk => (dispatch) => {
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

export const logoutThunk = (): Thunk => (dispatch) => {
  authAPI.logout().then(() => {
    removeToken()
    dispatch(setAuthUserData(null,null, false))
  })
}

export const registrationThunk =
  (login, password, passwordConfirmation): Thunk => (dispatch) => {
    dispatch(toggleIsFetching(true))
    authAPI
      .registration(login, password, passwordConfirmation)
      .then(() => {
        toast.success('Вы успешно зарегестрированы, теперь нажмите на Sing in чтобы авторизоваться', {
          theme: 'light',
          autoClose: 10000,
          draggable: true,
          position: toast.POSITION.BOTTOM_CENTER,
        })
        dispatch(toggleIsFetching(false))
      })
      .catch(() => dispatch(toggleIsFetching(false)))
  }

export default authReducer
