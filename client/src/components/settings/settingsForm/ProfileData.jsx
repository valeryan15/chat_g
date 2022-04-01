import React from 'react'
import { namePhoneInitialValues } from '../../support/formik'
import { NamePhoneSchema } from '../../support/validators'
import { Field, Formik } from 'formik'
import MaskedInput from 'react-text-mask/dist/reactTextMask'
import {phoneNumberMask} from "../../support/constants";

const ProfileData = (props) => {

  return (
    <div className="relative w-full h-full mt-4 ">
      <div className="bg-gray-200 dark:bg-gray-600 transition duration-1000 table m-0 m-auto w-1/3 p-4 rounded-lg ">
        <Formik
          initialValues={namePhoneInitialValues}
          validationSchema={NamePhoneSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm()
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
                  className="my-2 rounded-lg h-8 w-full border border-black"
                  placeholder="Enter your name"
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <div className="text-red-600">{errors.name}</div>
                ) : null}
              </div>

              <div className="my-4">
                <Field
                  name="phone"
                  render={({ field }) => (
                    <MaskedInput
                      className="my-2 rounded-lg h-8 w-full border border-black"
                      {...field}
                      mask={phoneNumberMask}
                      placeholder="8(123) 123-4567"
                      type="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                  )}
                />
                {errors.phone && touched.phone ? (
                  <div className="text-red-600">{errors.phone}</div>
                ) : null}
              </div>
              <div className="text-center">
                <button
                  className="py-2 px-8 text-center transition duration-1000 text-black dark:text-white"
                  type="submit"
                  disabled={errors.name && errors.phone}
                >
                  сохранить
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ProfileData
