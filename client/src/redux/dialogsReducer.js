import { chatsAPI } from '../api/api'
import { getUsersThunk } from './usersReducer'

const SET_USER_CHATS = 'SET_USER_CHATS'
const TOGGLE_ADD_CHAT = 'TOGGLE_ADD_CHAT'

const initialState = {
  chats: [],
  toggleAddChat: false,
}
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_CHAT:
      return {
        ...state,
        toggleAddChat: action.toggleAddChat,
      }

    case SET_USER_CHATS:
      return {
        ...state,
        chats: [...action.chats],
      }
    default:
      return state
  }
}

export const toggleAddChatAction = (toggleAddChat) => ({
  type: TOGGLE_ADD_CHAT,
  toggleAddChat,
})

export const setUserDialogAction = (chats) => ({
  type: SET_USER_CHATS,
  chats,
})

export const createChatThunk = (userId) => (dispatch) => {
  dispatch(toggleAddChatAction(true))
  return chatsAPI
    .createChat(userId)
    .then(() => {
      dispatch(toggleAddChatAction(false))
      dispatch(getUsersThunk())
    })
    .catch(dispatch(toggleAddChatAction(false)))
}

export const getChatsThunk = () => (dispatch) => {
  return chatsAPI.getChats().then((response) => {
    dispatch(setUserDialogAction(response))
  })
}

export default dialogsReducer
