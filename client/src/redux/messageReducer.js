import { messageAPI } from '../api/api'

const GET_MESSAGE = 'GET_MESSAGE'

const initialState = {
  messages: [],
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        messages: [...action.messages],
      }
    default:
      return state
  }
}

export const getMessageAction = (messages) => ({
  type:GET_MESSAGE,
  messages
})

export const getChatThunk = (chatId) => (dispatch) => {
  return messageAPI.getChat(chatId).then((response) => {
    console.log(response)
    dispatch(getMessageAction(response.messages))
  })
}

export default messageReducer
