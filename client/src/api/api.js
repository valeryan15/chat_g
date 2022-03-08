import axios from 'axios'
import { toast } from 'react-toastify'
import {getToken} from "../components/login/token";

const http = async (url, method, body = {}) => {
  let headers = getToken()
  let options = {}
  if (method === 'GET') {
    options.params = body
  } else {
    options.data = body
  }
  try {
    const response = await axios({
      url,
      method,
      ...options,
      headers,
    })
    if (response.status >= 200 && response.status < 400) {
      return response.data
    }
  } catch (e) {
    const errors = e.response.data.errors || []
    errors.map((e) =>
      toast.warn(e.msg, {
        theme: 'dark',
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      })
    )
    return Promise.reject(e)
  }
}


export const authAPI = {
  registration(login, password, passwordConfirmation) {
    const options = { login, password, passwordConfirmation }
    return http(
      'http://localhost:8081/common/sign-up',
      'POST',
      options
    )
  },
  authorization(login, password) {
    const options = { login, password }
    return http(
      'http://localhost:8081/common/sign-in',
      'POST',
      options
    )
  },
  getInfo(login) {
    const options = { login }

    return http(
      'http://localhost:8081/users/get-info',
      'POST',
      options,
    )
  },
}