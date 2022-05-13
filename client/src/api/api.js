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
    return http('http://localhost:8081/users/logout', 'POST')
  },
  getUser() {
    return http('http://localhost:8081/users/get-user', 'POST')
  },
  users() {
    return http('http://localhost:8081/users', 'POST')
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
    return http(
      'http://localhost:8081/settings/update-theme',
      'POST',
      { id, theme }
    )
  },
}

export const chatsAPI = {
  createChat(id) {
    return http(
      'http://localhost:8081/chats/create-chat',
      'POST',
      { id }
    )
  },
  getChats() {
    return http('http://localhost:8081/users/get-chats', 'POST')
  },
}

export const messageAPI = {
  getChat(id) {
    return http(
      'http://localhost:8081/chats/get-chat',
      'POST',
      { id }
    )
  },
  addMessage(id, message) {
    return http(
      'http://localhost:8081/chats/add-message',
      'POST',
      { id, message }
    )
  },
  updateMessage(chatId, messageId, message) {
    return http(
      'http://localhost:8081/chats/update-message',
      'POST',
      {chatId, messageId, message}
    )
  },
  readMessages(chatId, messages) {
    return http(
      'http://localhost:8081/chats/read-messages',
      'POST',
      {chatId, messages}
    )
  },
}
