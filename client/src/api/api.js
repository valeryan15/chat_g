import axios from 'axios'
import { toast } from 'react-toastify'

export const authAPI = {
  auth(login, password, passwordConfirmation) {
    return wrapper(
      axios.post('http://localhost:8081/common/sign-up', {
        login,
        password,
        passwordConfirmation,
      })
    )
  },
  login(login, password) {
    return wrapper(
      axios.post('http://localhost:8081/common/sign-in', {
        login,
        password,
      })
    )
  },
}

const wrapper = (promise) => {
  return promise.catch((error) => {
    if (error) {
      const errors = error.response.data.errors || []
      errors.map((e) =>
        toast.warn(e.msg, {
          theme: 'dark',
          draggable: true,
          position: toast.POSITION.TOP_RIGHT,
        })
      )
    }
  })
}
