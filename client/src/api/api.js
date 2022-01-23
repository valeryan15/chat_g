import axios from "axios";
import {toast} from "react-toastify";

export const authAPI = {
    auth(login, password, passwordConfirmation) {
        console.log(login, password, passwordConfirmation)
        return wrapper(axios.post('http://localhost:8081/users/sign-up',
            {login, password, passwordConfirmation}))
    },
    me(login) {
        return axios.get(`http://localhost:8081/users/${login}`)
    },
    // login(login, password) {
    //     return axios.post(``) //по идее должно быть в АПИ форма регистрации, форма логинизации и форма получения данных по логину
    // }

    // logout() {
    //     axios.delete(``)
    // }
}

function wrapper (promise) {
    return promise.catch((error) => {
        toast(`error ${error}`, {className: 'error-toast', draggable: true, position: toast.POSITION.TOP_RIGHT})
    })

}