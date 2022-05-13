import { chatsAPI } from '../api/api'
import { getUsersThunk } from './usersReducer'

const SET_USER_CHATS = 'SET_USER_CHATS'
const TOGGLE_ADD_CHAT = 'TOGGLE_ADD_CHAT'
const UPDATE_SUM_MESSAGES = 'UPDATE_SUM_MESSAGES'
const SET_DIALOG_NAME = 'SET_DIALOG_NAME'

const initialState = {
  chats: [],
  toggleAddChat: false,
  sumMessages: 0,
  dialogName: ''
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
    case UPDATE_SUM_MESSAGES:
      return {
        ...state,
        sumMessages: action.sumMessages,
      }
      case SET_DIALOG_NAME:
      return {
        ...state,
        dialogName: action.dialogName,
      }
    default:
      return state
  }
}

export const toggleAddChatAction = (toggleAddChat) => ({
  type: TOGGLE_ADD_CHAT,
  toggleAddChat,
})
export const setDialogNameAction = (dialogName) => ({
  type: SET_DIALOG_NAME,
  dialogName,
})

export const updateSumMessagesAction = (chats = []) => {
  let initialValue = 0
  const sumMessages = chats.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.countNewMessages
  }, initialValue)
  return {
    type: UPDATE_SUM_MESSAGES,
    sumMessages,
  }
}

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
}

export const getChatsThunk = () => (dispatch) => {
  return chatsAPI.getChats().then((response) => {
    dispatch(updateSumMessagesAction(response))
    dispatch(setUserDialogAction(response))
  })
}

export default dialogsReducer
