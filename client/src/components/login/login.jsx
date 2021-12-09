import LoginReduxForm from "./loginForm"

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    
    return (
        <LoginReduxForm onSubmit={onSubmit}/>
    )
}

export default Login