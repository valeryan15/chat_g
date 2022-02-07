import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunkMiddleWear from 'redux-thunk'
import authReducer from './authReducer'

let reducerBox = combineReducers({
  auth: authReducer,
})

let store = createStore(reducerBox, applyMiddleware(thunkMiddleWear))

export default store
