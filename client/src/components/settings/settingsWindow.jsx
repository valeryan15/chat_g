import React from 'react'
import NavSettingsContainer from "./NavSettingsContainer";
import {Route, Routes} from "react-router-dom";
import ProfileDataContainer from "./settingsForm/ProfileDataContainer";


const SettingsWindow = () => {
  return (
    <div className="flex h-full absolute w-full">
      <div className="min-w-max bg-gray-200 h-full">
        <div><NavSettingsContainer /></div>
      </div>
      <div className="bg-red-200 w-full h-full">
        <Routes>
          <Route path="/profileData" element={<ProfileDataContainer />} />
        </Routes>
      </div>
    </div>
  )
}

export default SettingsWindow


