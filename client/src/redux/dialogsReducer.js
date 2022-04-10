const SET_MESSAGE = 'SET_MESSAGE'
const SET_USER_DIALOG = 'SET_USER_DIALOG'

const initialState = {
  dialogs: [],
  chats: [],
  toggleAddUser: false,
}
let count = 0
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        chats: [
          ...state.chats,
          { id: count++, name: '', message: action.message },
        ],
      }
    case SET_USER_DIALOG:
      return {
        ...state,
        dialogs: [
          ...state.dialogs,
          { id: action.id, login: action.login },
        ],
        toggleAddUser: true
      }
    default:
      return state
  }
}

export const newMessageAction = (message) => ({
  type: SET_MESSAGE,
  message,
})
export const setUserAction = (id, login) => ({
  type: SET_USER_DIALOG,
  id,
  login,
})

export default dialogsReducer
