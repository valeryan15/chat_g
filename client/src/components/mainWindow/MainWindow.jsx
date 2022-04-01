import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Dialog from '../dialogs/Dialog'
import MessageContainer from '../dialogs/MessageContainer'
import {connect} from "react-redux";

const MainWindow = (props) => {
  if(!props.isToken) {
    return <Navigate to='/login' />
  }
  return (
    <div className="flex h-full absolute w-full">
      <div className="min-w-[400px] bg-white border-r-2 border-slate-200 transition duration-1000 dark:bg-gray-600 h-full">
        <Dialog />
      </div>
      <div className="bg-white dark:bg-gray-600 transition duration-1000  w-full h-full">
        <Routes>
          <Route path="/chatWindow" element={<MessageContainer />} />
        </Routes>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  isToken: state.settings.isToken
})
export default connect(mapStateToProps) (MainWindow)
