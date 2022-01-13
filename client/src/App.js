
import Login from './components/login/login';

import Header from "./components/header/Header";
import AuthForm from "./authorization/AuthForm";
import Auth from "./authorization/Auth";

const App = (props) => {
    return (
            <div className="App">
                <Header/>
                <Auth/>
                {/*<Login/>*/}

            </div>

);
}

export default App;
