import axios from "axios";

export const authAPI = {
    auth(login, password, passwordConfirmation) {
        console.log(login, password, passwordConfirmation)
        return axios.post('http://localhost:8081/users/sign-up',
            {login, password, passwordConfirmation})
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