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
import Button from '@mui/material/Button'
import userStore from '../../../store/UserStore'
import { PasswordField } from '../../Form/PasswordField'
import { EmailField } from '../../Form/EmailField'
import { linkButtonStyle } from '../../../themes'

const userSchema = Yup.object({
  email: Yup.string().nullable().email().required('обязательно для заполнения'),
  password: Yup.string().required('обязательно для заполнения'),
})

export const Login = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
  const [currentIcon, setCurrentIcon] = useState<IconDefinition>(faEyeSlash)

  const changePasswordVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible)
    setCurrentIcon(currentIcon === faEye ? faEyeSlash : faEye)
  }

  const changePage = () => {
    userStore.setIsLoginPageOpen(false)
  }

  return (
    <div className="form-box login-box">
      <div className="header-form">
        <FontAwesomeIcon size="5x" icon={faCircleUser} color="#3A9AB9" />
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={userSchema}
        onSubmit={async (values, { resetForm, setErrors }) => {
          const response = await userStore.login(values.email, values.password)
          if (!response.message) {
            resetForm()
            userStore.setIsAuthDialogOpen(false)
          }
          setErrors({ [response.errors.field]: response.message })
        }}
      >
        {({ errors, touched }) => (
          <Form className="loginForm">
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
              Войти!
            </Button>
          </Form>
        )}
      </Formik>
      <div className="auth-link-container">
        <Button sx={linkButtonStyle} onClick={changePage}>
          Впервые у нас? Зарегистрироваться
        </Button>
      </div>
    </div>
  )
}
