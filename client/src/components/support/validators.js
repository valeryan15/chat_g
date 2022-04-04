import * as Yup from 'yup'

const validatorsSignInSchema = {
  login: Yup.string()
    .max(50, 'Максимально 50 символов')
    .required('Required')
    .matches(
      /^[a-zA-Z0-9\-\_]*$/,
      'только латинские буквы, разрешены символы - и _ , пробелы запрещены'
    ),
  password: Yup.string()
    .min(5, 'Минимально 5 символов')
    .required('Required')
    .matches(
      /^[a-zA-Z0-9\-\_]*$/,
      'только латинские буквы, разрешены символы - и _ , пробелы запрещены'
    ),
}

const validatorsSignupSchema = {
  ...validatorsSignInSchema,
  passwordConfirmation: Yup.string()
    .min(5, 'Минимально 5 символов')
    .required('Required')
    .matches(
      /^[a-zA-Z0-9\-\_]*$/,
      'только латинские буквы, разрешены символы - и _ , пробелы запрещены'
    ),
}

const validatorsNameSchema = {
  name: Yup.string()
    .max(100, 'Максимально 100 символов')
    .required('Required')
    .matches(
      /^[а-яА-Я\-\_\ ]*$/,
      'только русские буквы, разрешены символы - и _ '
    ),
  phone: Yup.string()
    .min(1, 'Минимально 1 символ')
    .required('Required')
    .matches(
      /^[0-9\-\+\(\)\ ]*$/,
      'только цифры, разрешены символы -'
    )
}

export const SignupSchema = Yup.object().shape(validatorsSignupSchema)
export const SignInSchema = Yup.object().shape(validatorsSignInSchema)
export const NamePhoneSchema = Yup.object().shape(validatorsNameSchema)
