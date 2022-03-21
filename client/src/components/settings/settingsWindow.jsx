import React from 'react'
import NavSettingsContainer from './NavSettingsContainer'
import { Route, Routes } from 'react-router-dom'
import ProfileDataContainer from './settingsForm/ProfileDataContainer'
import TypeThemeContainer from "../theme/TypeThemeContainer";

const SettingsWindow = () => {
  return (
    <div className="flex h-full absolute w-full">
      <div className="w-1/4 bg-gray-200 border-r-2 border-slate-200 transition duration-1000 dark:bg-gray-600 h-full">
        <div>
          <NavSettingsContainer />
        </div>
      </div>
      <div className="bg-white transition duration-1000 dark:bg-gray-600 w-full h-full">
        <Routes>
          <Route path="/profile" element={<ProfileDataContainer />} />
          <Route path="/theme" element={<TypeThemeContainer />} />
        </Routes>
      </div>
    </div>
  )
}

export default SettingsWindow
