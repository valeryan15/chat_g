import { messageAPI } from '../api/api.ts'
import {ThunkAction} from "redux-thunk";
import {AppState} from "./redux-store";

const GET_MESSAGE = 'GET_MESSAGE'
const EDIT_MESSAGE = 'EDIT_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const SEND_EDIT_MESSAGE = 'SEND_EDIT_MESSAGE'
const CANCEL_EDIT_MODE = 'CANCEL_EDIT_MODE'
const LOADED_MESSAGE_PAGE = 'LOADED_MESSAGE_PAGE'
const ADD_MESSAGE = 'ADD_MESSAGE'
const DISABLED_FORM = 'DISABLED_FORM'

type InitialState = typeof initialState
type Message = {
  id: string
  message: string
  timestamp: number
  user: {
    id: string
    login: string
  }
}
const initialState = {
  messages: [] as Array<Message>,
  isEditMessage: false,
  message: '',
  editMessId: null as string,
  messagesEnd: '',
  loadedMessagePage: false,
  isFormDisabled: false,
  success: false,
}

const messagesReducer = (
  state = initialState,
  action: Actions
): InitialState => {
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
            user: action.response.user,
          },
        ],
      }
    default:
      return state
  }
}
type Actions =
  | AddMessageAction
  | GetMessageAction
  | DisabledFormAction
  | UpdateMessageAction
  | EditMessageAction
  | SendEditMessageAction
  | CancelEditModeAction
  | LoadedMessagePageAction

type ResponseAddMessage = {
  id: string
  message: string
  timestamp: number
  user: {
    id: string
    login: string
  }
}
type AddMessageAction = {
  type: typeof ADD_MESSAGE
  response: ResponseAddMessage
}
type GetMessageAction = {
  type: typeof GET_MESSAGE
  messages: Array<Message>
}
type DisabledFormAction = {
  type: typeof DISABLED_FORM
  isFormDisabled: boolean
}
type UpdateMessageAction = {
  type: typeof UPDATE_MESSAGE
  message: string
}
type EditMessageAction = {
  type: typeof EDIT_MESSAGE
  editMessage: string
  editMessId: string
}
type SendEditMessageAction = {
  type: typeof SEND_EDIT_MESSAGE
}
type CancelEditModeAction = {
  type: typeof CANCEL_EDIT_MODE
}
type LoadedMessagePageAction = {
  type: typeof LOADED_MESSAGE_PAGE
  loadedMessagePage: boolean
}
type Thunk = ThunkAction<Promise<void>, AppState, unknown, Actions>
export const getMessageAction = (messages: Array<Message>): GetMessageAction => ({
  type: GET_MESSAGE,
  messages,
})
export const addMessageAction = (response: ResponseAddMessage): AddMessageAction => ({
  type: ADD_MESSAGE,
  response,
})
export const disabledFormAction = (isFormDisabled: boolean): DisabledFormAction => ({
  type: DISABLED_FORM,
  isFormDisabled,
})
export const updateMessageAction = (message: string): UpdateMessageAction => ({
  type: UPDATE_MESSAGE,
  message,
})
export const editMessageAction = (editMessage: string, editMessId: string): EditMessageAction => ({
  type: EDIT_MESSAGE,
  editMessage,
  editMessId,
})
export const sendEditMessageAction = (): SendEditMessageAction => ({type: SEND_EDIT_MESSAGE,
})
export const cancelEditModeAction = (): CancelEditModeAction => ({type: CANCEL_EDIT_MODE,
})
export const loadedMessagePageAction = (loadedMessagePage: boolean): LoadedMessagePageAction => ({
  type: LOADED_MESSAGE_PAGE,
  loadedMessagePage,
})

export const getChatThunk = (chatId):Thunk => (dispatch) => {
  dispatch(loadedMessagePageAction(false))
  return messageAPI.getChat(chatId).then((response) => {
    dispatch(getMessageAction(response.messages))
    dispatch(loadedMessagePageAction(true))
  })
}
export const addMessageThunk = (chatId, message):Thunk => (dispatch) => {
  dispatch(disabledFormAction(true))
  return messageAPI.addMessage(chatId, message).then((response) => {
    dispatch(addMessageAction(response))
    dispatch(disabledFormAction(false))
  })
}
export const editMessageThunk = (chatId, messageId, message):Thunk => (dispatch) => {
    return messageAPI
      .updateMessage(chatId, messageId, message)
      .then(() => {
        dispatch(sendEditMessageAction())
        dispatch(getChatThunk(chatId))
      })
  }
export const readMessageThunk = (chatId, messages):Thunk => () => {
  return messageAPI.readMessages(chatId, messages)
}

export default messagesReducer
