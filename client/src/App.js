import Login from './components/login/login'
import Auth from './authorization/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SettingsWindow from './components/settings/settingsWindow'
import { ToastContainer, Zoom } from 'react-toastify'
import HeaderContainer from './components/header/HeaderContainer'
import 'react-toastify/dist/ReactToastify.css'
import Footer from "./components/footer/Footer";
import MainWindowContainer from "./components/mainWindow/MainWindowContainer";

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        draggable={false}
        transition={Zoom}
        autoClose={8000}
      />
      <BrowserRouter>
        <HeaderContainer />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings/*" element={<SettingsWindow />} />
          <Route path="/main/*" element={<MainWindowContainer />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
