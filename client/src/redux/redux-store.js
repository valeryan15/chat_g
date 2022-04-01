import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleWear from 'redux-thunk'
import authReducer from './authReducer'
import settingsReducer from "./settingsReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";

let reducerBox = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  dialogsPage: dialogsReducer,
  users: usersReducer
})

let store = createStore(reducerBox, applyMiddleware(thunkMiddleWear))

export default store
