import axios from 'axios'
import { toast } from 'react-toastify'

// const wrapper = (promise) => {
//   return promise.catch((resolve, reject, error) => {
//     console.log('error')
//     const errors = error.response.data.errors || []
//     errors.map((e) =>
//       toast.warn(e.msg, {
//         theme: 'dark',
//         draggable: true,
//         position: toast.POSITION.TOP_RIGHT,
//       })
//     )
//     reject(error)
//   })
// }

const http = async (url, method, body = {}) => {
  let options = {}
  if (method === 'GET') {
    options.params = body
  } else {
    options.data = body
  }
  try {
    const response = await axios({
      method,
      url,
      ...options,
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

// export const authAPI = {
//   auth(login, password, passwordConfirmation) {
//     return wrapper(
//       axios.post('http://localhost:8081/common/sign-up', {
//         login,
//         password,
//         passwordConfirmation,
//       })
//     )
//   },
//   login(login, password) {
//     return wrapper(
//       axios.post('http://localhost:8081/common/sign-in', {
//         login,
//         password,
//       })
//     )
//   },
// }
export const authAPI = {
  auth(login, password, passwordConfirmation) {
    const options = { login, password, passwordConfirmation }
    return http(
      'http://localhost:8081/common/sign-up',
      'POST',
      options
    )
  },
  login(login, password) {
    const options = { login, password }
    return http(
      'http://localhost:8081/common/sign-in',
      'POST',
      options
    )
  },
}
