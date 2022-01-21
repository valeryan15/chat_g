import React, {useState} from "react"
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import preloader from '../img/785.gif'


const SignupSchema = Yup.object().shape({
    login: Yup.string()
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .required('Required')
})
 const AuthForm = (props) => {
    const [loading, setLoading] = useState(false)

     const fetchDataServer = () => {
        setLoading(true)
     }

     return (
         <div className='relative w-full h-full'>
             <div className='fixed min-h-48 -ml-48 text-center bg-gray-600 rounded w-96 top-1/3 left-2/4'>
                 <div className='cursor-pointer relative float-right -top-5 right-5'>
                     <div className="h-[2px] w-4 absolute mt-8 bg-gray-900 rounded-sm origin-center rotate-45 ease-in duration-300"></div>
                     <div className="h-[2px] w-4 absolute mt-8 bg-gray-900 rounded-sm origin-center -rotate-45 ease-in duration-300"></div>
                 </div>
                 <Formik
                     initialValues={{ login: '', password: '', passwordConfirmation: '' }}
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
                           isSubmitting,
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
                                 {errors.login && touched.login ? (
                                     <div className='text-red-600'>{errors.login}</div>
                                 ) : null}
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
                                 {errors.password && touched.password ? (
                                     <div className='text-red-600'>{errors.password}</div>
                                 ) : null}
                             </div>
                             <div className='my-4'>
                                 <Field className='border border-yellow-300 rounded w-72'
                                        placeholder='Repeat your password'
                                        type="password"
                                        name="passwordConfirmation"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.passwordConfirmation}
                                 />
                                 {errors.passwordConfirmation && touched.passwordConfirmation ? (
                                     <div className='text-red-600'>{errors.passwordConfirmation}</div>
                                 ) : null}
                             </div>
                             <div className='text-red-600'>
                                 {errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}
                             </div>
                             <button className='button mb-2'
                                     type="submit"
                                     disabled={loading}>
                                 {loading && (<img src={preloader} alt={'preloader'} className='w-4'/> )}
                                 {loading && <span>Singing up...</span>}
                                 {!loading && <span>Sing up</span>}
                             </button>
                             <button className='ml-12 mb-2 text-xs font-thin text-white' >Authorized?</button>
                         </form>
                     )}
                 </Formik>
             </div>

         </div>
     )
 }

export default AuthForm