import React from "react"
import {Formik} from "formik";


const LoginForm = (props) => {
    return (
        <div className='relative w-full h-full'>
            <div className='fixed h-48 -ml-48 text-center bg-gray-600 rounded w-96 top-1/3 left-2/4'>
                <Formik
                    initialValues={{ email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid login';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                        setSubmitting(false);

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
                                       type="email"
                                       name="email"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.email}
                                />
                            </div>
                            <div className='text-white'>
                                {errors.email && touched.email && errors.email}
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
                                Authorize
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