export const authInitialValues = {
  login: '',
  password: '',
  passwordConfirmation: '',
}

export const loginInitialValues = {
  login: '',
  password: '',
}





















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
