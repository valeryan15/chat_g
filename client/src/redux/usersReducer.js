import { authAPI } from '../api/api'

const GET_USERS = 'GET_USERS'

const initialState = {
  users: [
    { id: '1', login: 'Valera' },
    { id: '2', login: 'Kostya' },
    { id: '3', login: 'Vasya' },
  ],
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      debugger
      return {
        ...state,
        users: [
          ...state.users,
          { id: action.id, login: action.login },
        ],
      }
    default:
      return state
  }
}

export const setUsersAction = (users) => ({
  type: GET_USERS,
  users,
})

export const getUsersThunk = () => (dispatch) => {
  authAPI.users().then(() => {
    dispatch(setUsersAction())
  })
}

export default settingsReducer
