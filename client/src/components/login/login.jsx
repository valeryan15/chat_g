
import LoginForm from "./loginForm";

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    
    return (
        <LoginForm onSubmit={onSubmit}/>
    )
}

export default Login