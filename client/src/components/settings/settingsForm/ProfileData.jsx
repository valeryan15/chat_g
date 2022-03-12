import React from 'react'

const ProfileData = (props) => {
  let newNameDataBody = props.newNameDataText
  let newPhoneDataBody = props.newPhoneDataText

  const sendProfileData = () => {
    props.sendProfileData()
    props.sendPhoneData()
  }

  const onChangeNameData = (e) => {
    let nameBody = e.target.value
    props.onChangeNameData(nameBody)
  }
  const onChangePhoneData = (e) => {
    let phoneBody = e.target.value
    props.onChangePhoneData(phoneBody)
  }
  return (
    <div className="relative w-full h-full mt-12">
      <div className="text-center">
        <textarea
          onChange={onChangeNameData}
          value={newNameDataBody}
          className="m-2 rounded-lg h-8 w-1/3"
          placeholder="Введите имя и фамилию"
        />
      </div>
      <div className="text-center">
        <textarea
          value={newPhoneDataBody}
          onChange={onChangePhoneData}
          className="m-2 rounded-lg h-8 w-1/3"
          placeholder="Введите номер телефона"
        />
      </div>
      <div className="text-center">
        <button onClick={sendProfileData}>сохранить</button>
      </div>
    </div>
  )
}

export default ProfileData
