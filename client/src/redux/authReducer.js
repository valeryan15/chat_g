import {authAPI} from "../api/api";
import 'react-toastify/dist/ReactToastify.css'

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

export const getAuthUserDataThunk = (login) => (dispatch) => {
    authAPI.me(login)
        .then(response => {
            if (response.status === 200) {
                let {id, login} = response.data
                dispatch(setAuthUserData(id, login, true))
            } else {
            }
        })
}

export const loginThunk = (login) => (dispatch) => {
    authAPI.me(login)
        .then(response => {
            if (response.status === 200) {
                let {id, login} = response.data
                dispatch(getAuthUserDataThunk(id, login))
            }
        })
}
// export const logoutThunk = () => (dispatch) => {
//     authAPI.logout()
//         .then(response => {
//             if (response.status === 200) {
//                 let {login} = response.data
//                 dispatch(setAuthUserData(login))
//             }
//         })
// }
export const authThunk = (login, password, passwordConfirmation) => (dispatch) => {
    authAPI.auth(login, password, passwordConfirmation)
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                dispatch(loginThunk(login, password))  // надо сделать редирект на страницу логина
            }
        })
}

export default authReducer