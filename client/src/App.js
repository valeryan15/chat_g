import Login from './components/login/login'
import Auth from './components/authorization/Auth'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SettingsWindow from './components/settings/settingsWindow.tsx'
import { ToastContainer, Zoom } from 'react-toastify'
import HeaderContainer from './components/header/HeaderContainer.tsx'
import 'react-toastify/dist/ReactToastify.css'
import MainWindow from './components/mainWindow/MainWindow'
import { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import UsersContainer from './components/users/usersContainer.tsx'
import { initializeApp } from './redux/appReducer.ts'
import { ThemeContext } from './contexts/themeContext'
import RequireAuth from './contexts/authContext'
import { getChatsThunk } from './redux/dialogsReducer.ts'
import FooterContainer from './components/footer/FooterContainer.tsx'
import preloader from './img/free-animated-icon-cloud-network-6172518.gif'

const App = (props) => {
  useEffect(() => {
    props.initializeApp()
  }, [])
  useEffect(() => {
    let timeoutId = null
    if (props.isAuth) {
      props.getChatsThunk()
      timeoutId = setTimeout(function updateTick() {
        props.getChatsThunk()
        timeoutId = setTimeout(updateTick, 15000)
      }, 15000)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  })

  const themeStore = useContext(ThemeContext)
  const classes = `min-h-full flex flex-col ${themeStore.theme}`
  return (
    <div className={classes}>
      <ToastContainer
        draggable={false}
        transition={Zoom}
        autoClose={8000}
      />
      {!props.initialized ? (
        <div className="w-24 ml-[48%] mt-[20%]">
          <div className="ml-2">загрузка...</div>
          <img src={preloader} alt="preloader" />
        </div>
      ) : (
        <BrowserRouter>
          <HeaderContainer />
          <div className="flex-auto relative dark:bg-gray-600">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/settings/*"
                element={
                  <RequireAuth>
                    <SettingsWindow />
                  </RequireAuth>
                }
              />
              <Route
                path="/main/*"
                element={
                  <RequireAuth>
                    <MainWindow />
                  </RequireAuth>
                }
              />
              <Route
                path="/users"
                element={
                  <RequireAuth>
                    <UsersContainer />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
          {props.isAuth ? <FooterContainer /> : null}
        </BrowserRouter>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  theme: state.settings.theme,
  initialized: state.app.initialized,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {
  initializeApp,
  getChatsThunk,
})(App)
