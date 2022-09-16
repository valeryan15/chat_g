import Login from './components/login/login'
import Auth from './authorization/Auth'
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

const App = (props) => {
  useEffect(() => {
    console.log('kkk;g')
    props.initializeApp()
  }, [])

  const themeStore = useContext(ThemeContext)
  const classes = `min-h-full flex flex-col ${themeStore.theme}`
  console.log(props)

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

export default connect(mapStateToProps, { initializeApp })(App)
