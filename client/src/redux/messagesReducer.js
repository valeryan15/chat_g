import { messageAPI } from '../api/api'

const GET_MESSAGE = 'GET_MESSAGE'
const EDIT_MESSAGE = 'EDIT_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const SEND_EDIT_MESSAGE = 'SEND_EDIT_MESSAGE'
const CANCEL_EDIT_MODE = 'CANCEL_EDIT_MODE'
const READ_MESSAGE = 'READ_MESSAGE'
const LOADED_MESSAGE_PAGE = 'LOADED_MESSAGE_PAGE'
const ADD_MESSAGE = 'ADD_MESSAGE'
const DISABLED_FORM = 'DISABLED_FORM'

const initialState = {
  messages: [],
  isEditMessage: false,
  message: '',
  editMessId: null,
  messageEnd: '',
  loadedMessagePage: false,
  isFormDisabled: false,
}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        messages: [...action.messages],
      }
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.message,
      }
    case EDIT_MESSAGE:
      return {
        ...state,
        message: action.editMessage,
        editMessId: action.editMessId,
        isEditMessage: true,
      }
    case SEND_EDIT_MESSAGE:
      return {
        ...state,
        message: '',
        isEditMessage: false,
      }
    case CANCEL_EDIT_MODE:
      return {
        ...state,
        message: '',
        isEditMessage: false,
      }
    case READ_MESSAGE:
      return {
        ...state,
        success: action.success,
      }
    case LOADED_MESSAGE_PAGE:
      return {
        ...state,
        loadedMessagePage: action.loadedMessagePage,
      }
      case DISABLED_FORM:
      return {
        ...state,
        isFormDisabled: action.isFormDisabled,
      }
    case ADD_MESSAGE:
      return {
        ...state,
        message: '',
        messages: [
          ...state.messages,
          {
            id: action.response.id,
            message: action.response.message,
            timestamp: action.response.timestamp,
            user: action.response.user
          },
        ],
      }
    default:
      return state
  }
}

export const getMessageAction = (messages) => ({
  type: GET_MESSAGE,
  messages,
})
export const addMessageAction = (response) => ({
  type: ADD_MESSAGE,
  response,
})
export const disabledFormAction = (isFormDisabled) => ({
  type: DISABLED_FORM,
  isFormDisabled,
})
export const updateMessageAction = (message) => ({
  type: UPDATE_MESSAGE,
  message,
})
export const editMessageAction = (editMessage, editMessId) => ({
  type: EDIT_MESSAGE,
  editMessage,
  editMessId,
})
export const sendEditMessageAction = () => ({
  type: SEND_EDIT_MESSAGE,
})
export const cancelEditModeAction = () => ({
  type: CANCEL_EDIT_MODE,
})
export const loadedMessagePageAction = (loadedMessagePage) => ({
  type: LOADED_MESSAGE_PAGE,
  loadedMessagePage,
})

export const getChatThunk = (chatId) => (dispatch) => {
  dispatch(loadedMessagePageAction(false))
  return messageAPI.getChat(chatId).then((response) => {
    dispatch(getMessageAction(response.messages))
    dispatch(loadedMessagePageAction(true))
  })
}
export const addMessageThunk = (chatId, message) => (dispatch) => {
  dispatch(disabledFormAction(true))
  return messageAPI.addMessage(chatId, message).then((response) => {
    dispatch(addMessageAction(response))
    dispatch(disabledFormAction(false))
  })
}
export const editMessageThunk =
  (chatId, messageId, message) => (dispatch) => {
    return messageAPI
      .updateMessage(chatId, messageId, message)
      .then(() => {
        dispatch(sendEditMessageAction())
        dispatch(getChatThunk(chatId))
      })
  }
export const readMessageThunk = (chatId, messages) => () => {
  return messageAPI.readMessages(chatId, messages)
}

export default messagesReducer
