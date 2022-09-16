import  { authAPI } from '../api/api.ts'
import {ThunkAction} from "redux-thunk";
import {AppState} from "./redux-store";
import {Dispatch} from "redux";

const GET_USERS = 'GET_USERS'


type InitialState = typeof initialState
export type UsersType = {
  id: string
  login: string
  chatExist: boolean
}
const initialState = {
  users: [] as Array<UsersType>,
}

const settingsReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users:
          [...action.users],
      }
    default:
      return state
  }
}
type Actions = SetUsersAction
type SetUsersAction = {
  type: typeof GET_USERS
  users: Array<UsersType>
}
type Thunk = ThunkAction<Promise<void>, AppState, unknown, Actions>

export const setUsersAction = (users: Array<UsersType>): SetUsersAction => ({
  type: GET_USERS,
  users,
})

export const getUsersThunk = ():Thunk => (dispatch:Dispatch<Actions>) => {
  authAPI.users().then((response) => {
    dispatch(setUsersAction(response))
  })
}

export default settingsReducer
