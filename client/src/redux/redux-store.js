import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleWear from 'redux-thunk'
import authReducer from './authReducer'
import settingsReducer from "./settingsReducer";

let reducerBox = combineReducers({
  auth: authReducer,
  settings: settingsReducer
})

let store = createStore(reducerBox, applyMiddleware(thunkMiddleWear))

export default store
