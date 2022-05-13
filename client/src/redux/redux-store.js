import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleWear from 'redux-thunk'
import authReducer from './authReducer'
import settingsReducer from "./settingsReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import appReducer from "./appReducer";
import messageReducer from "./messagesReducer";

let reducerBox = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  dialogs: dialogsReducer,
  users: usersReducer,
  app: appReducer,
  message: messageReducer
})

let store = createStore(reducerBox, applyMiddleware(thunkMiddleWear))

export default store
