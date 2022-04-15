import { authAPI } from '../api/api'

const GET_USERS = 'GET_USERS'

const initialState = {
  users: [],
  chatExist: null
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users:
          [...action.users],
        chatExist: action.payload
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
  authAPI.users().then((response) => {
    dispatch(setUsersAction(response))
  })
}

export default settingsReducer
