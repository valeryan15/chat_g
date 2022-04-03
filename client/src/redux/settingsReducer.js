import { authAPI, settingsAPI } from '../api/api'
import { setAuthUserData } from './authReducer'

const SET_NAME_PHONE = 'SET_NAME_PHONE'
const SET_THEME = 'SET_THEME'
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const UPDATE_USER_DATA = 'UPDATE_USER_DATA'

const initialState = {
  settings: {
    id: '',
    name: '',
    phone: '',
    theme: '',
  },
}



const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_PHONE:
      return {
        ...state,
        settings: {
          ...state.settings,
          name: action.newName,
          phone: action.newPhone,
        },
      }

    case SET_THEME:
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.theme,
        },
      }

    case INITIALIZED_SUCCESS:
      return {
        ...state,
        ...action.state,
      }

    case UPDATE_USER_DATA:
      return {
        ...state,
        settings: {
          ...state.settings,
          name: action.name,
          phone: action.phone,
        }
      }

    default:
      return state
  }
}

export const initializedAction = (state) => ({
  type: INITIALIZED_SUCCESS,
  state,
})

export const namePhoneChangeAction = (newName, newPhone) => ({
  type: SET_NAME_PHONE,
  newName,
  newPhone,
})

export const themeChangeAction = (theme) => ({
  type: SET_THEME,
  theme,
})

export const updateUserDataAction = ( name, phone,) => ({
  type: UPDATE_USER_DATA,
   name, phone,
})

export const updateInfoThunk = (id, name, phone) => (dispatch) => {
  settingsAPI.updateInfo(id, name, phone).then((response) => {
      let { name, phone } = response
      dispatch(updateUserDataAction( name, phone))
    dispatch(namePhoneChangeAction( name, phone))
  })
}

export const updateThemeThunk = (id, theme) => (dispatch) => {
  console.log('updateThemeThunk', theme)
  settingsAPI.updateTheme(id, theme).then(() => {
    dispatch(themeChangeAction(theme))
  })
}

export const getUserThunk = () => (dispatch) => {
  console.log('попали в getInfo')
  return authAPI.getUser().then((response) => {
    let { login } = response.user
    dispatch(initializedAction(response.user))
    dispatch(setAuthUserData(login, true))
  })
}

export default settingsReducer
