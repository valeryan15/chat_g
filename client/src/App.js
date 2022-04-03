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

const App = (props) => {
  useEffect(() => {
    props.initializeApp()
  }, [])

  const themeStore = useContext(ThemeContext)
  const classes = `min-h-full flex flex-col ${themeStore.theme}`

  if (!props.initialized) {
    return <span>loading...</span>
  } else {
    return (
      <div className={classes}>
        <ToastContainer
          draggable={false}
          transition={Zoom}
          autoClose={8000}
        />
        <BrowserRouter>
          <HeaderContainer />
          <div className="flex-auto">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/settings/*"
                element={<SettingsWindow />}
              />
              <Route path="/main/*" element={<MainWindow />} />
              <Route path="/users" element={<UsersContainer />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.settings.settings.theme,
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App)
