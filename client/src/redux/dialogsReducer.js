const SET_MESSAGE = 'SET_MESSAGE'

const initialState = {
  chats: [
    {
      id: '',
      name: '',
      message: '',
    },
  ],
}
let count = 0
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        chats: [
            ...state.chats,
          {id: count++, name: '', message: action.message}
        ],
      }
    default:
      return state
  }
}

export const newMessageAction = (message) => ({
  type: SET_MESSAGE,
  message,
})

export default dialogsReducer
