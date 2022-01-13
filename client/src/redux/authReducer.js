import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }

        default:
            return state
    }
}

export const setAuthUserData = (userId, login) => ({type: SET_USER_DATA, payload: {userId, login}})

export const loginThunk = () => (dispatch) => {
    authAPI.login()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {login} = response.data.data
                dispatch(setAuthUserData(login))
            }
        })
}
export const logoutThunk = () => (dispatch) => {
    authAPI.login()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {login} = response.data.data
                dispatch(setAuthUserData(login))
            }
        })
}
export const authThunk = (login, password, passwordConfirmation) => (dispatch) => {
    authAPI.auth(login, password, passwordConfirmation)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(loginThunk(login, password, passwordConfirmation))
            }
        })
}

export default authReducer