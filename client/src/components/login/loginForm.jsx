import React, {useState} from "react"
import {Formik, Field} from "formik";
import preloader from "../../img/785.gif";
import {SignupSchema} from "../support/Validators";

const LoginForm = (props) => {

    const [loading, setLoading] = useState(false)

    const isSetPreloader = () => {
        setLoading(true)
    }

    return (
        <div className='relative w-full h-full'>
            <div className='fixed min-h-48 -ml-48 text-center bg-gray-600 rounded w-96 top-1/3 left-2/4'>
                <button className='cursor-pointer relative float-right -top-5 right-5'>
                    <div className="h-[2px] w-4 absolute mt-8 bg-gray-900 rounded-sm origin-center rotate-45 ease-in duration-300"></div>
                    <div className="h-[2px] w-4 absolute mt-8 bg-gray-900 rounded-sm origin-center -rotate-45 ease-in duration-300"></div>
                </button>
                <Formik
                    initialValues={{ login: '', password: ''}}
                    validationSchema={SignupSchema}
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
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='my-4'>
                                <Field className='border border-yellow-300 rounded w-72'

                                       placeholder='Enter your login'
                                       type="login"
                                       name="login"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.login}
                                />
                            </div>
                            <div className='text-red-600'>
                                {errors.login && touched.login}
                            </div>
                            <div className='my-4'>
                                <Field className='border border-yellow-300 rounded w-72'
                                       placeholder='Enter your password'
                                       type="password"
                                       name="password"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.password}
                                />
                            </div>
                            <div className='text-red-600'>
                                {errors.password && touched.password}
                            </div>
                            <button className='button mb-2 w-28 h-8 '
                                    type="submit"
                                    disabled={loading}
                            >
                                {<span className='flex justify-between px-4'>
                                {loading && <span>Вход...</span>}
                                {loading && (<img src={preloader} alt={'preloader'} className='w-4'/>)}
                                </span>}
                                {!loading && <span>Войти</span>}
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