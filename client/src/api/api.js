import axios from "axios";

export const authAPI = {
    auth(login, password, passwordConfirmation) {
        console.log(login, password, passwordConfirmation)
        return axios.post('http://localhost:8081/users/sign-up',
            {login, password, passwordConfirmation})
    },
    login(login) {
        return axios.get(`http://localhost:8081/users/sign-up/${login}`)
    },
    // logout() {
    //     axios.delete(``)
    // }
}