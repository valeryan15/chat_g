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
            }

        default:
            return state
    }
}

export const setAuthUserData = (userId, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, login, isAuth}})

export const getAuthUserDataThunk = () => (dispatch) => {
    authAPI.login(login, password)
        .then(response => {
            if (response.status === 200) {
                let {id, login} = response.data.data
                dispatch(getAuthUserData(id,login))
            }
        })
}

export const loginThunk = (login, password) => (dispatch) => {
    authAPI.login(login, password)
        .then(response => {
            if (response.status === 200) {
                let {id, login} = response.data.data
                dispatch(getAuthUserDataThunk(id,login))
            }
        })
}
export const logoutThunk = () => (dispatch) => {
    authAPI.login()
        .then(response => {
            if (response.status === 200) {
                let {login} = response.data.data
                dispatch(setAuthUserData(login))
            }
        })
}
export const authThunk = (login, password, passwordConfirmation) => (dispatch) => {
    authAPI.auth(login, password, passwordConfirmation)
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                dispatch(loginThunk(login, password))  //редирект на страницу логина
            }
        })
}

export default authReducer