import React from 'react'

const MainWindow = () => {
  return (
    <div className="flex h-full absolute w-full">
      <div className="w-1/4 bg-gray-200 transition duration-1000 dark:bg-gray-600 h-full">
      </div>
      <div className= 'bg-white transition duration-1000 dark:bg-gray-800 w-full h-full'>
        <h1 className='text-black'>MainWindow</h1>
      </div>
    </div>
  )
}
export default MainWindow
