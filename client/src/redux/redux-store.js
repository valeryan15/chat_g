import { applyMiddleware, createStore, combineReducers } from "redux"
import thunkMiddleWear from 'redux-thunk'
import { reducer as formReducer} from 'redux-form'

let reducerBox = combineReducers({
    form: formReducer
})

let store = createStore(reducerBox, applyMiddleware(thunkMiddleWear))

export default store