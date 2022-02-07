import React from 'react'
import Footer from '../footer/Footer'

const SettingsWindow = () => {
  return (
    <div className="flex h-full absolute w-full">
      <div className="w-72 bg-gray-200 h-full">
        <Footer />
      </div>
      <div className="bg-red-200 w-full h-full"></div>
    </div>
  )
}

export default SettingsWindow


