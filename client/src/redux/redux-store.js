import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleWear from 'redux-thunk'
import authReducer from './authReducer'
import profileReducer from './prifileReducer'

let reducerBox = combineReducers({
  auth: authReducer,
  profilePage: profileReducer,
})

let store = createStore(reducerBox, applyMiddleware(thunkMiddleWear))

export default store
