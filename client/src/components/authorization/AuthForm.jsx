import React from 'react'
import { Formik, Field } from 'formik'
import preloader from '../../img/785.gif'
import { SignupSchema } from '../support/validators'
import { authInitialValues } from '../support/formik'

const AuthForm = (props) => {
  return (
    <div className="relative w-full h-full">
      <div className="fixed  -ml-48 text-center bg-gray-200 dark:bg-gray-800 rounded w-96 top-1/3 left-2/4">
        <Formik
          initialValues={authInitialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
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
              <div className="my-4">
                <Field
                  className="border border-gray-300 dark:text-white dark:bg-gray-600 rounded w-72"
                  placeholder="Enter your login"
                  type="login"
                  name="login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                />
                {errors.login && touched.login ? (
                  <div className="text-red-600">{errors.login}</div>
                ) : null}
              </div>
              <div className="my-4">
                <Field
                  className="border border-gray-300 rounded dark:text-white dark:bg-gray-600 w-72"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className="my-4">
                <Field
                  className="border border-gray-300 dark:text-white dark:bg-gray-600 rounded w-72"
                  placeholder="Repeat your password"
                  type="password"
                  name="passwordConfirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirmation}
                />
                {errors.passwordConfirmation &&
                touched.passwordConfirmation ? (
                  <div className="text-red-600">
                    {errors.passwordConfirmation}
                  </div>
                ) : null}
              </div>
              <div className="text-red-600">
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation}
              </div>
              <button
                className="button mb-2 h-8 dark:bg-black dark:hover:bg-blue-800 dark:border-gray-400 dark:border"
                type="submit"
                disabled={props.isFetching}
              >
                {
                  <span className="flex justify-between px-4">
                    {props.isFetching && <span>Отправка...</span>}
                    {props.isFetching && (
                      <img
                        src={preloader}
                        alt={'preloader'}
                        className="w-6 ml-2"
                      />
                    )}
                  </span>
                }
                {!props.isFetching && <span>Регистрация</span>}
              </button>
              <button className="ml-12 mb-2 text-xs font-thin dark:text-white">
                Authorized?
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AuthForm
