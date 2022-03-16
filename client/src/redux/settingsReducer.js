const SET_NAME_DATA = 'SET_NAME_DATA'
const SET_PHONE_DATA = 'SET_PHONE_DATA'

const initialState = {
  settingsNamePhone: {
    nameData: '',
    phoneData: '',
  },
  login: '',
  id: '',
  settings: {
    theme: {
      id: '',
      name: 'darkTheme',
    },
  },
  chats: [
    {
      id: '',
      name: '',
    },
  ],
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_DATA:
      return {
        ...state,
        settingsNamePhone: {
          ...state.settingsNamePhone,
          nameData: action.newName,
        },
      }
    case SET_PHONE_DATA:
      return {
        ...state,
        settingsNamePhone: {
          ...state.settingsNamePhone,
          phoneData: action.newPhone,
        },
      }
    default:
      return state
  }
}

export const profileDataAC = (newName) => ({
  type: SET_NAME_DATA,
  newName,
})
export const phoneDataAC = (newPhone) => ({
  type: SET_PHONE_DATA,
  newPhone,
})

export default settingsReducer
