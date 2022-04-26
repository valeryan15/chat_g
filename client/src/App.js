import Login from './components/login/login'
import Auth from './components/authorization/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SettingsWindow from './components/settings/settingsWindow'
import { ToastContainer, Zoom } from 'react-toastify'
import HeaderContainer from './components/header/HeaderContainer'
import 'react-toastify/dist/ReactToastify.css'
import MainWindow from './components/mainWindow/MainWindow'
import { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import UsersContainer from './components/users/usersContainer'
import { initializeApp } from './redux/appReducer'
import { ThemeContext } from './contexts/themeContext'
import RequireAuth from './contexts/authContext'
import { getChatsThunk } from './redux/dialogsReducer'
import FooterContainer from "./components/footer/FooterContainer";

let tick = 0

const App = (props) => {
  useEffect(() => {
    props.initializeApp()
    props.getChatsThunk()
  }, [])

  useEffect(() => {
    let unsubscribe = null
    if (props.isAuth) {
      unsubscribe = setTimeout(function updateTick() {
        props.getChatsThunk()
        if (tick <= 10) {
          tick++
          unsubscribe = setTimeout(updateTick, 5000)
        }
      }, 5000)
    }
    return () => {
      if (unsubscribe) {
        clearTimeout(unsubscribe)
        tick = 0
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
        <span>loading...</span>
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
          <FooterContainer />
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
