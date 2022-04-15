import axios from 'axios'
import { toast } from 'react-toastify'
import { getToken } from '../components/login/token'

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
  registration(options) {
    return http(
      'http://localhost:8081/common/sign-up',
      'POST',
      options
    )
  },
  authorization(options) {
    return http(
      'http://localhost:8081/common/sign-in',
      'POST',
      options
    )
  },
  logout() {
    return http(
      'http://localhost:8081/users/logout',
      'POST',
    )
  },

  getUser() {
    return http(
      'http://localhost:8081/users/get-user',
      'POST',
    )
  },
  users() {
    return http(
      'http://localhost:8081/users',
      'POST',
    )
  },

}

export const settingsAPI = {
  updateInfo(options) {
    return http(
      'http://localhost:8081/settings/update-info',
      'POST',
      options
    )
  },
  updateTheme(id, theme) {
    const options = {id, theme}
    return http(
      'http://localhost:8081/settings/update-theme',
      'POST',
      options
    )
  }
}

export const chatsAPI = {
  createChat(id) {
    const options = {id}
    return http(
      'http://localhost:8081/chats/create-chat',
      'POST',
      options
    )
  }
}
