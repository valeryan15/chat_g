import React, { useState } from 'react'

const ProfileData = (props) => {
  let [newName = '', setNewName] = useState(props.newName)
  let [newPhone = '', setNewPhone] = useState(props.newPhone)

  const sendProfileData = () => {
    props.sendName(newName)
    props.sendPhone(newPhone)
  }

  const onChangeName = (e) => {
    setNewName(e.target.value)
  }
  const onChangePhone = (e) => {
    setNewPhone(e.target.value)
  }

  return (
    <div className="relative w-full h-full mt-4 ">
      <div className='bg-gray-200 dark:bg-gray-600 transition duration-1000 table m-0 m-auto w-1/3 p-4 rounded-lg '>
        <div className="text-center">
          <input
            onChange={onChangeName}
            value={newName}
            className="my-2 rounded-lg h-8 w-full border border-black"
            placeholder="Введите имя и фамилию"
          />
        </div>
        <div className="text-center">
          <input
            value={newPhone}
            onChange={onChangePhone}
            className="my-2 rounded-lg h-8 w-full border border-black"
            placeholder="Введите номер телефона"
          />
        </div>
        <div className="text-center">
          <button
            className=" py-2 px-8 text-center transition duration-1000 text-black dark:text-white"
            onClick={sendProfileData}
          >
            сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileData
