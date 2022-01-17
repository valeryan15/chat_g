
import Login from './components/login/login';

import Header from "./components/header/Header";
import Auth from "./authorization/Auth";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainWindow from "./components/mainWindow/MainWindow";


const App = () => {
    return (
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path='/main' element={<MainWindow/>}/>
                        <Route path="/auth" element={<Auth/>}/>
                        <Route path="/login" element={<Login/>}/>

                    </Routes>
                </BrowserRouter>

            </div>

);
}

export default App;
