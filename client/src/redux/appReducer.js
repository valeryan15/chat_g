import { getUserThunk } from './settingsReducer'
import { getToken } from '../components/login/token'
import { setAuthUserData } from './authReducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
})

export const initializeApp = () => (dispatch) => {
  let isToken = Boolean(getToken())
  if (isToken) {
    dispatch(setAuthUserData(null, true))
    dispatch(getUserThunk()).finally(() => {
      dispatch(initializedSuccess())
    })
  } else {
    dispatch(initializedSuccess())
  }
}

export default appReducer
