import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Message from '../dialogs/Message'
import Dialog from '../dialogs/Dialog'


const MainWindow = () => {
  return (
    <div className="flex h-full absolute w-full">
      <div className="w-1/5 bg-white border-r-2 border-slate-200 transition duration-1000 dark:bg-gray-600 h-full">
        <Dialog />
      </div>
      <div className="bg-white dark:bg-gray-600 transition duration-1000  w-full h-full">
        <Routes>
          <Route path="/chatWindow" element={<Message />} />
        </Routes>
      </div>
    </div>
  )
}
export default MainWindow
