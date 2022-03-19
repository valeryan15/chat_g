import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dialog from '../dialogs/Dialog'
import MessageContainer from "../dialogs/MessageContainer";


const MainWindow = () => {
  return (
    <div className="flex h-full absolute w-full">
      <div className="w-1/4 bg-white border-r-2 border-slate-200 transition duration-1000 dark:bg-gray-600 h-full">
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
export default MainWindow
