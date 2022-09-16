import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleWear from 'redux-thunk'
import authReducer from './authReducer.ts'
import settingsReducer from "./settingsReducer.ts";
import dialogsReducer from "./dialogsReducer.ts";
import usersReducer from "./usersReducer.ts";
import appReducer from "./appReducer.ts";
import messageReducer from "./messagesReducer.ts";

let reducerBox = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  dialogs: dialogsReducer,
  users: usersReducer,
  app: appReducer,
  message: messageReducer
})
type ReducerBox = typeof reducerBox
export type AppState = ReturnType<ReducerBox>
let store = createStore(reducerBox, applyMiddleware(thunkMiddleWear))

export default store
