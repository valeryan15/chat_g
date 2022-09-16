import { getUserThunk } from './settingsReducer.ts'
import { getToken } from '../components/login/token'
import { ThunkAction } from 'redux-thunk'
import { AppState } from './redux-store'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type InitialState = {
  initialized: boolean
}

let initialState: InitialState = {
  initialized: false,
}

const appReducer = (
  state = initialState,
  action: Actions
): InitialState => {
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
type Actions = InitializedSuccess
type InitializedSuccess = {
  type: typeof INITIALIZED_SUCCESS
}
type Thunk = ThunkAction<Promise<void>, AppState, unknown, Actions>

export const initializedSuccess = (): InitializedSuccess => ({
  type: INITIALIZED_SUCCESS,
})

export const initializeApp =
  (): Thunk =>
  (dispatch, getState) => {
    let isToken = Boolean(getToken())
    if (isToken) {
      dispatch(getUserThunk()).finally(() => {
        dispatch(initializedSuccess())
      })
    } else {
      dispatch(initializedSuccess())
    }
  }

export default appReducer
