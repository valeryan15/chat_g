import axios from "axios";

export const authAPI = {
    auth(login, password, passwordConfirmation) {
        console.log(login, password, passwordConfirmation)
        return axios.post('http://localhost:8081/users/sign-up',
            {login, password, passwordConfirmation})
    },
    login(login,password) {
        console.log(login,password)
        return axios.get(`http://localhost:8081/users/${login}`)
    },
    // logout() {
    //     axios.delete(``)
    // }
}