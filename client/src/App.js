
import Login from './components/login/login';

import Header from "./components/header/Header";
import Auth from "./authorization/Auth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainWindow from "./components/mainWindow/MainWindow";
import SettingsWindow from "./components/settings/settingsWindow";
import {ToastContainer, Zoom} from "react-toastify";


const App = () => {
    return (
            <div className="App">
                <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/auth" element={<Auth/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/settings" element={<SettingsWindow/>}/>
                        <Route path="/main" element={<MainWindow/>}/>

                    </Routes>
                </BrowserRouter>

            </div>

);
}

export default App;
