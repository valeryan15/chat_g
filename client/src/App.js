import Login from './components/login/login'
import Auth from './authorization/Auth'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import SettingsWindow from './components/settings/settingsWindow'
import { ToastContainer, Zoom } from 'react-toastify'
import HeaderContainer from './components/header/HeaderContainer'
import 'react-toastify/dist/ReactToastify.css'
import MainWindow from './components/mainWindow/MainWindow'
import { Component } from 'react'
import { connect } from 'react-redux'
import UsersContainer from "./components/users/usersContainer";
import {getUserThunk} from "./redux/settingsReducer";


class App extends Component {
  componentDidMount() {
    this.props.getUserThunk()
  }
  render() {
    return (
      <div className="min-h-full flex flex-col">

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
  isToken: state.settings.isToken,
})

export default connect(mapStateToProps, { getUserThunk })(App)
