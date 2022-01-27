import {authAPI} from "../api/api";
import 'react-toastify/dist/ReactToastify.css'
import {toast} from "react-toastify";

const SET_USER_DATA = 'SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    userId: null,
    login: null,
    isAuth: false,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
            case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }

        default:
            return state
    }
}

export const setAuthUserData = (userId, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, login, isAuth}})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getAuthUserDataThunk = (login) => (dispatch) => {
    authAPI.me(login)
        .then(response => {
            if (response.status === 200) {
                let {id, login} = response.data
                dispatch(setAuthUserData(id, login, true))
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
    dispatch(toggleIsFetching(true))
    authAPI.auth(login, password, passwordConfirmation)
        .then(response => {
            dispatch(toggleIsFetching(false))
            if (response.status === 200) {
                dispatch(loginThunk(login, password))
            }
        }).catch(error => {
            if(error) {
                dispatch(toggleIsFetching(false))
                const errors = error.response.data.errors || []
                errors.map(e => toast.warn(e.msg, {
                    theme: "dark",
                    draggable: true,
                    position: toast.POSITION.TOP_RIGHT
                }) )

            }
    })
}

export default authReducer