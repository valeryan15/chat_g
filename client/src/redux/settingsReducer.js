
const SET_NAME_DATA = 'SET_NAME_DATA'
const SET_PHONE_DATA = 'SET_PHONE_DATA'
const UPDATE_NEW_NAME_DATA = 'UPDATE_NEW_NAME_DATA'
const UPDATE_NEW_PHONE_DATA = 'UPDATE_NEW_PHONE_DATA'

const initialState = {
  settings: {
    nameData: '',
    phoneData: '',
    newNameDataText: '',
    newPhoneDataText: '',
  }
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_DATA:
      let newName = state.settings.nameData
      newName = state.newNameDataText
      state.newNameDataText = ''
      return {
        ...state,
        nameData: newName
      }
      case UPDATE_NEW_NAME_DATA:
      let updateProfileDataText = action.updateProfileData
        return {
        ...state,
        newNameDataText: updateProfileDataText,
      }
      case SET_PHONE_DATA:
      let phoneBody = state.settings.phoneData
        phoneBody = state.newPhoneDataText
        state.newPhoneDataText = ''
      return {
        ...state,
        phoneData: phoneBody
      }
      case UPDATE_NEW_PHONE_DATA:
      let updatePhoneDataText = action.updatePhoneData
      return {
        ...state,
        newPhoneDataText: updatePhoneDataText,
      }
    default:
      return state
  }
}

export const profileDataAC = () => ({type: SET_NAME_DATA,  })
export const updateProfileDataAC = (updateProfileData) => ({type: UPDATE_NEW_NAME_DATA, updateProfileData })
export const phoneDataAC = () => ({type: SET_PHONE_DATA, })
export const updatePhoneDataAC = (updatePhoneData) => ({type: UPDATE_NEW_PHONE_DATA, updatePhoneData })

export default settingsReducer