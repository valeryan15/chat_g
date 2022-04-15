import { chatsAPI } from '../api/api'

const SET_MESSAGE = 'SET_MESSAGE'
const SET_USER_DIALOG = 'SET_USER_DIALOG'
const TOGGLE_ADD_CHAT = 'TOGGLE_ADD_CHAT'

const initialState = {
  dialogs: [],
  chats: [],
  toggleAddChat: false,
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
    case TOGGLE_ADD_CHAT:
      return {
        ...state,
        toggleAddChat: action.toggleAddChat,
      }
    case SET_USER_DIALOG:
      return {
        ...state,
        dialogs: [
          ...state.dialogs,
          { id: action.id, login: action.login },
        ],
      }
    default:
      return state
  }
}

export const newMessageAction = (message) => ({
  type: SET_MESSAGE,
  message,
})

export const toggleAddChatAction = (toggleAddChat) => ({
  type: TOGGLE_ADD_CHAT,
  toggleAddChat,
})

export const createChatThunk = (userId) => (dispatch) => {
  dispatch(toggleAddChatAction(true))
  return chatsAPI
    .createChat(userId)
    .then(() => {
      dispatch(toggleAddChatAction(false))
    })
    .catch(dispatch(toggleAddChatAction(true)))
}
export default dialogsReducer
