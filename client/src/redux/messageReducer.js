import { messageAPI } from '../api/api'

const GET_MESSAGE = 'GET_MESSAGE'
const EDIT_MESSAGE = 'EDIT_MESSAGE'

const initialState = {
  messages: [],
  isEditMessage: false
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        messages: [...action.messages],
      }
      case EDIT_MESSAGE:
      return {
        ...state,
        isEditMessage: true,
      }
    default:
      return state
  }
}

export const getMessageAction = (messages) => ({
  type: GET_MESSAGE,
  messages,
})
export const editMessageAction = () => ({
  type: EDIT_MESSAGE,
})

export const getChatThunk = (chatId) => (dispatch) => {
  return messageAPI.getChat(chatId).then((response) => {
    dispatch(getMessageAction(response.messages))
  })
}
export const addMessageThunk = (chatId, message) => (dispatch) => {
  return messageAPI.addMessage(chatId, message).then(() => {
    dispatch(getChatThunk(chatId))
  })
}

export default messageReducer
