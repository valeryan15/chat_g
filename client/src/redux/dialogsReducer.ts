import { chatsAPI } from '../api/api.ts'
import { getUsersThunk } from './usersReducer.ts'
import {ThunkAction} from "redux-thunk";
import {AppState} from "./redux-store";

const SET_USER_CHATS = 'SET_USER_CHATS'
const TOGGLE_ADD_CHAT = 'TOGGLE_ADD_CHAT'
const UPDATE_SUM_MESSAGES = 'UPDATE_SUM_MESSAGES'
const SET_DIALOG_NAME = 'SET_DIALOG_NAME'

type InitialState = typeof initialState
export type Messages = {
  id: string
  message: string
  user: {
    id: string
    login: string
  }
}
const initialState = {
  chats: [] as Array<Messages>,
  toggleAddChat: false,
  sumMessages: 0,
  dialogName: ''
}
const dialogsReducer = (state = initialState, action: Actions): InitialState => {
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
type Actions = ToggleAddChatAction | SetDialogNameAction | UpdateSumMessagesAction | SetUserDialogAction
type ToggleAddChatAction = {
  type: typeof TOGGLE_ADD_CHAT
  toggleAddChat: boolean
}
type SetDialogNameAction = {
  type: typeof SET_DIALOG_NAME
  dialogName: string
}
type UpdateSumMessagesAction = {
  type: typeof UPDATE_SUM_MESSAGES
  sumMessages: number
}
type SetUserDialogAction = {
  type: typeof SET_USER_CHATS
  chats: Array<Messages>
}
type Thunk = ThunkAction<Promise<void>, AppState, unknown, Actions>


export const toggleAddChatAction = (toggleAddChat: boolean):ToggleAddChatAction => ({
  type: TOGGLE_ADD_CHAT,
  toggleAddChat,
})
export const setDialogNameAction = (dialogName: string):SetDialogNameAction => ({
  type: SET_DIALOG_NAME,
  dialogName,
})
export const updateSumMessagesAction = (chats = []): UpdateSumMessagesAction => {
  let initialValue: number = 0
  const sumMessages: number = chats.reduce((previousValue: number | null, currentValue: any): number => {
    return previousValue + currentValue.countNewMessages
  }, initialValue)
  return {
    type: UPDATE_SUM_MESSAGES,
    sumMessages,
  }
}
export const setUserDialogAction = (chats: Array<Messages>): SetUserDialogAction => ({
  type: SET_USER_CHATS,
  chats,
})

export const createChatThunk = (userId: string): Thunk => (dispatch) => {
  dispatch(toggleAddChatAction(true))
  return chatsAPI
    .createChat(userId)
    .then(() => {
      dispatch(toggleAddChatAction(false))
      dispatch(getUsersThunk())
    })
}
export const getChatsThunk = ():Thunk => (dispatch) => {
  return chatsAPI.getChats().then((response) => {
    dispatch(updateSumMessagesAction(response))
    dispatch(setUserDialogAction(response))
  })
}

export default dialogsReducer
