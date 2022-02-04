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
//
// const dark = {
//     name: darktheme,
//     buttonColor: blue600,
//     mainWindowBackgroundColor: gray900,
//     messageExportColor: blue600,
//     messageImportColor: gray600,
//     textColor: white,
//     inputBackgroundColor: gray600,
//     dialogsBackgroundColor: gray600,
//     headerColor: gray600,
//     settingsIconsColor: gray300,
//     activeIconColor: blue600,
//     activeDialogColor: blue600,
// }
//
// const white = {
//     name: whiteTheme,
//     buttonColor: blue300,
//     mainWindowBackgroundColor: white,
//     messageExportColor: blue300,
//     messageImportColor: gray200,
//     textColor: black,
//     inputBackgroundColor: white,
//     dialogsBackgroundColor: white,
//     headerColor: white,
//     settingsIconsColor: gray300,
//     activeIconColor: blue300,
//     activeDialogColor: blue300,
// }
