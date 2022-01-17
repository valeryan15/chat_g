import React from "react"
import {Formik} from "formik";


const LoginForm = (props) => {
    return (
        <div className='relative w-full h-full'>
            <div className='fixed h-48 -ml-48 text-center bg-gray-600 rounded w-96 top-1/3 left-2/4'>
                <button className='cursor-pointer relative float-right -top-5 right-5'>
                    <div className="h-[2px] w-4 absolute mt-8 bg-gray-900 rounded-sm origin-center rotate-45 ease-in duration-300"></div>
                    <div className="h-[2px] w-4 absolute mt-8 bg-gray-900 rounded-sm origin-center -rotate-45 ease-in duration-300"></div>
                </button>
                <Formik
                    initialValues={{ login: '', password: ''}}
                    // validate={values => {
                    //     const errors = {};
                    //     if (!values.login) {
                    //         errors.login = 'Required';
                    //     } else if (
                    //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)
                    //     ) {
                    //         errors.login = 'Invalid login';
                    //     }
                    //     return errors;
                    // }}
                    onSubmit={(values, { setSubmitting }) => {

                        setSubmitting(false);
                        props.onSubmit(values)

                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='my-4'>
                                <input className='border border-yellow-300 rounded w-72'
                                       placeholder='Enter your login'
                                       type="login"
                                       name="login"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.login}
                                />
                            </div>
                            <div className='text-white'>
                                {errors.login && touched.login && errors.login}
                            </div>
                            <div className='my-4'>
                                <input className='border border-yellow-300 rounded w-72'
                                       placeholder='Enter your password'
                                       type="password"
                                       name="password"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.password}
                                />
                            </div>
                            {errors.password && touched.password && errors.password}
                            <button className='button' type="submit" disabled={isSubmitting}>
                                Sing in
                            </button>
                            <button className='ml-12 text-xs font-thin text-white'>forgot password?</button>
                        </form>
                    )}
                </Formik>
            </div>

    </div>
    )
}

export default LoginForm