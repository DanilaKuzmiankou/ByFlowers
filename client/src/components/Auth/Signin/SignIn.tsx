import { useState } from 'react'
import '../Auth.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleUser,
  faEye,
  faEyeSlash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import Button from '@mui/material/Button'
import userStore from '../../../store/UserStore'
import { PasswordField } from '../../Form/PasswordField'
import { NameField } from '../../Form/NameField'
import { PhoneField } from '../../Form/PhoneField'
import { EmailField } from '../../Form/EmailField'
import { phoneRegExp } from '../../../utils/Utils'
import { linkButtonStyle } from '../../../themes'

YupPassword(Yup)

const userSchema = Yup.object({
  name: Yup.string()
    .max(40, 'максимальная длина - 40 символов')
    .required('обязательно для заполнения'),
  email: Yup.string().nullable().email().required('обязательно для заполнения'),
  password: Yup.string()
    .required('обязательно для заполнения')
    .minLowercase(
      1,
      'пароль должен содержать как минимум 1 букву нижнего регистра',
    )
    .minUppercase(
      1,
      'пароль должен содержать как минимум 1 букву верхнего регистра',
    )
    .minNumbers(1, 'пароль должен содержать как минимум 1 цифру')
    .min(8, 'минимальная длина - 8 символов')
    .max(50, 'максимальная длина - 50 символов'),
  phone: Yup.string()
    .matches(phoneRegExp, 'телефонный номер некорректен')
    .required('обязательно для заполнения'),
})

export const Signin = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const [currentIcon, setCurrentIcon] = useState<IconDefinition>(faEyeSlash)

  const changePasswordVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible)
    setCurrentIcon(currentIcon === faEye ? faEyeSlash : faEye)
  }

  const changePage = () => {
    userStore.setIsLoginPageOpen(true)
  }

  return (
    <div className="form-box signin-box">
      <div className="header-form">
        <FontAwesomeIcon size="5x" icon={faCircleUser} color="#3A9AB9" />
      </div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          phone: '',
        }}
        validationSchema={userSchema}
        onSubmit={async (values, { resetForm, setErrors }) => {
          const response = await userStore.registration(
            values.email,
            values.password,
            values.phone,
            values.name,
          )
          if (!response.message) {
            resetForm()
            userStore.setIsAuthDialogOpen(false)
          }
          setErrors({ [response.errors.field]: response.message })
        }}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form className="loginForm">
            <NameField
              isNameFieldTouched={touched.name}
              nameFieldErrors={errors.name}
            />

            <PhoneField
              isPhoneFieldTouched={touched.phone}
              phoneFieldErrors={errors.phone}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />

            <EmailField
              isEmailFieldTouched={touched.email}
              emailFieldErrors={errors.email}
            />

            <PasswordField
              isPasswordFieldTouched={touched.password}
              passwordFieldErrors={errors.password}
              passwordIsVisible={passwordIsVisible}
              changePasswordVisibility={changePasswordVisibility}
              currentIcon={currentIcon}
              showStrengthBar
              password={values.password}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                fontFamily: 'AvenirBold, sans-serif',
                fontSize: '1.5rem',
                height: '38px',
                marginTop: '20px',
                width: '100%',
              }}
            >
              Зарегистрироваться!
            </Button>
          </Form>
        )}
      </Formik>
      <div className="auth-link-container">
        <Button sx={linkButtonStyle} onClick={changePage}>
          Уже имеете аккаунт? Войдите!
        </Button>
      </div>
    </div>
  )
}
