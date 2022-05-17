import React from 'react'
import NavSettingsContainer from './NavSettingsContainer'
import { Route, Routes} from 'react-router-dom'
import ProfileDataContainer from './settingsForm/ProfileDataContainer'
import TypeThemeContainer from "../theme/TypeThemeContainer";
import {connect} from "react-redux";

const SettingsWindow = () => {
  return (
    <div className="flex h-full absolute w-full">
      <div className=" min-w-[400px] max-w-[400px] bg-white border-r-[1px] border-gray-500 transition duration-1000 dark:bg-gray-600 h-full">
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
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStateToProps) (SettingsWindow)
