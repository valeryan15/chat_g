import React from 'react'
import { Route, Routes} from 'react-router-dom'
import MessageContainer from '../dialogs/MessageContainer'
import {connect} from "react-redux";
import DialogContainer from "../dialogs/dialogsPage/DialogContainer";

function MainWindow() {

  return (
    <div className="flex h-full absolute w-full">
      <div
        className="min-w-[400px] bg-white border-r-2 border-slate-200 transition duration-1000 dark:bg-gray-600 h-full">
        <DialogContainer/>
      </div>
      <div className="bg-white dark:bg-gray-600 transition duration-1000  w-full h-full">
        <Routes>
          <Route path="/chatWindow" element={<MessageContainer/>}/>
        </Routes>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  theme: state.settings.theme
})
export default connect(mapStateToProps) (MainWindow)
