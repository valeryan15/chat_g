import axios from 'axios'
import { toast } from 'react-toastify'
import { getToken } from '../components/login/token'

const baseUrl = 'http://localhost:8081/'

type UpdateInfo = {
  id: string
  name: string
  phone: string
}
type Messages = {
  id: string
}
type Registration = {
  login: string
  password: string
  passwordConfirmation: string
}
type Authorization = {
  login: string
  password: string
}
type Chats = {
  id: string
  name: string
  countNewMessages: number
}
type GetUserResponse = {
  id: string
  login: string
  settings: {
    id: string
    name: string
    phone: string
    theme: string
  }
  chats: Array<Chats>
}

const http = async (url: string, method: string, body: any = {}) => {
  let headers = getToken()
  let options: any = {}
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
  registration(options: Registration) {
    return http(`${baseUrl}common/sign-up`, 'POST', options)
  },
  authorization(options: Authorization) {
    return http(`${baseUrl}common/sign-in`, 'POST', options)
  },
  logout() {
    return http(`${baseUrl}users/logout`, 'POST')
  },
  getUser() {
    return http(`${baseUrl}users/get-user`, 'POST')
  },
  users() {
    return http(`${baseUrl}users`, 'POST')
  },
}
export const settingsAPI = {
  updateInfo(options: UpdateInfo) {
    return http(`${baseUrl}settings/update-info`, 'POST', options)
  },
  updateTheme(id: string, theme: string) {
    return http(`${baseUrl}settings/update-theme`, 'POST', {
      id,
      theme,
    })
  },
}

export const chatsAPI = {
  createChat(id: string) {
    return http(`${baseUrl}chats/create-chat`, 'POST', { id })
  },
  getChats() {
    return http(`${baseUrl}users/get-chats`, 'POST')
  },
}

export const messageAPI = {
  getChat(id: string) {
    return http(`${baseUrl}chats/get-chat`, 'POST', { id })
  },
  addMessage(id: string, message: string) {
    return http(`${baseUrl}chats/add-message`, 'POST', {
      id,
      message,
    })
  },
  updateMessage(chatId: string, messageId: string, message: string) {
    return http(`${baseUrl}chats/update-message`, 'POST', {
      chatId,
      messageId,
      message,
    })
  },
  readMessages(chatId:string, messages: Array<Messages>) {
    return http(`${baseUrl}chats/read-messages`, 'POST', {
      chatId,
      messages,
    })
  },
}
