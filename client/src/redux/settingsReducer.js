const SET_NAME_PHONE = 'SET_NAME_PHONE'

const initialState = {
  settingsNamePhone: {
    name: '',
    phone: '',
  },
  login: "valeryan15",
  id: 1,
  settings: {
    theme: "light",
    chats: [
      {
        id: 1,
        name: "nene"
      }
    ]
  }
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_PHONE:
      return {
        ...state,
        settingsNamePhone: {
          ...state.settingsNamePhone,
          name: action.newName,
          phone: action.newPhone
        },
      }
    default:
      return state
  }
}

export const namePhoneChangeAC = (newName, newPhone) => ({
  type: SET_NAME_PHONE,
  newName, newPhone
})


export default settingsReducer
