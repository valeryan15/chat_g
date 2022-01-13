
import Login from './components/login/login';

import Header from "./components/header/Header";
import AuthForm from "./authorization/AuthForm";

const App = (props) => {
    return (
            <div className="App">
                <Header/>
                <AuthForm/>
                {/*<Login/>*/}

            </div>

);
}

export default App;
