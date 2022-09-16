import { authAPI, settingsAPI } from '../api/api.ts'
import { setAuthUserData } from './authReducer.ts'
import {ThunkAction} from "redux-thunk";
import {AppState} from "./redux-store";

const SET_NAME_PHONE = 'SET_NAME_PHONE'
const SET_THEME = 'SET_THEME'
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
const IS_CHANGE_THEME = 'IS_CHANGE_THEME'

type InitialState = typeof initialState
const initialState = {
  id: '',
  name: '',
  phone: '',
  theme: '',
  isChangeTheme: false,
}

const settingsReducer = (
  state = initialState,
  action: Actions
): InitialState => {
  switch (action.type) {
    case SET_NAME_PHONE:
      return {
        ...state,
        name: action.newName,
        phone: action.newPhone,
      }

    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
      }

    case INITIALIZED_SUCCESS:
      return {
        ...state,
        ...action.state,
      }
    case IS_CHANGE_THEME:
      return {
        ...state,
        isChangeTheme: action.isChange,
      }

    case UPDATE_USER_DATA:
      return {
        ...state,
        name: action.name,
        phone: action.phone,
      }

    default:
      return state
  }
}
type Actions =
  | InitializedAction
  | IsChangeThemeAction
  | NamePhoneChangeAction
  | ThemeChangeAction
  | UpdateUserDataAction
type InitializedAction = {
  type: typeof INITIALIZED_SUCCESS
  state: InitialState
}
type IsChangeThemeAction = {
  type: typeof IS_CHANGE_THEME
  isChange: boolean
}
type NamePhoneChangeAction = {
  type: typeof SET_NAME_PHONE
  newName: string
  newPhone: string
}
type ThemeChangeAction = {
  type: typeof SET_THEME
  theme: string
}
type UpdateUserDataAction = {
  type: typeof UPDATE_USER_DATA
  name: string
  phone: string
}
type Thunk = ThunkAction<Promise<void>, AppState, unknown, Actions>
export const initializedAction = (state: InitialState): InitializedAction => ({
  type: INITIALIZED_SUCCESS,
  state,
})
export const isChangeThemeAction = (isChange: boolean): IsChangeThemeAction => ({
  type: IS_CHANGE_THEME,
  isChange,
})
export const namePhoneChangeAction = (newName: string, newPhone: string): NamePhoneChangeAction => ({
  type: SET_NAME_PHONE,
  newName,
  newPhone,
})
export const themeChangeAction = (theme: string): ThemeChangeAction => ({
  type: SET_THEME,
  theme,
})
export const updateUserDataAction = (name: string, phone: string): UpdateUserDataAction => ({
  type: UPDATE_USER_DATA,
  name,
  phone,
})

export const updateInfoThunk = (id, name, phone):Thunk => (dispatch) => {
  settingsAPI.updateInfo(id, name, phone).then((response) => {
    let { name, phone } = response
    dispatch(updateUserDataAction(name, phone))
    dispatch(namePhoneChangeAction(name, phone))
  })
}
export const updateThemeThunk = (id, theme):Thunk => (dispatch) => {
  dispatch(isChangeThemeAction(true))
  settingsAPI.updateTheme(id, theme).then(() => {
    dispatch(themeChangeAction(theme))
    dispatch(isChangeThemeAction(false))
  })
}
export const getUserThunk = ():Thunk => (dispatch) => {
  return authAPI.getUser().then((response) => {
    let { id, login } = response.user
    dispatch(setAuthUserData(id, login, true))
    dispatch(initializedAction(response.user.settings))
  })
}

export default settingsReducer
