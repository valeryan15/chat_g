import React from "react"
import { Field, reduxForm } from "redux-form"


const LoginForm = (props) => {
    return (
        <div className='relative w-full h-full'>
            <div className='fixed h-48 -ml-48 text-center bg-gray-900 rounded w-96 top-1/3 left-2/4'>
                <form onSubmit={props.handleSubmit} className='h-40 mt-8'>
                    <div className=''>
                        <Field className='border border-yellow-300 rounded w-72'  
                                placeholder='Enter your login' 
                                name='login'
                                component={'input'}/>
                    </div>
                    <div className=''>
                    <div className='my-4'>
                        <Field className='border border-yellow-300 rounded w-72' 
                                placeholder='Enter your password' 
                                name='password'
                                type='password'
                                component={'input'}/>
                                
                    </div>
                    <div className='my-4 -ml-40 text-white'>
                        <Field className='mr-2' 
                                type="checkbox"
                                name='rememberMe'
                                component={'input'} 
                        />remember me
                    </div>
                        <button className='button'>Sign in</button>
                        <button className='ml-12 text-xs font-thin text-white'>Forgot password?</button>
                    </div>
                </form>
            </div>

    </div>
    )
}

const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm)

export default LoginReduxForm