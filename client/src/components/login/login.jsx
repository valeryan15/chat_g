
import LoginForm from "./loginForm";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/authReducer";

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunk(formData.login, formData.password)
    }
    
    return (
        <LoginForm onSubmit={onSubmit}/>
    )
}
const mapStateToProps = (state) =>  ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {loginThunk}) (Login)