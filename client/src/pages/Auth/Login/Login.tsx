import React, {useState} from 'react';
import '../Auth.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faEye, faLock, faAt, faCircleUser, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {ErrorMessage, Field, Form, Formik, FieldProps} from "formik";
import * as Yup from 'yup';
import userStore from "../../../store/UserStore";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {IUser} from "../../../models/IUser";


const userSchema = Yup.object({
    email: Yup.string().nullable().email().required('required'),
    password: Yup.string().required('required')
})

export const Login = () => {

    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
    const [currentIcon, setCurrentIcon] = useState<IconDefinition>(faEyeSlash)

    const navigate = useNavigate();

    const changePasswordVisibility = () => {
        setPasswordIsVisible(!passwordIsVisible)
        setCurrentIcon(currentIcon===faEye?faEyeSlash:faEye)
    }

    return (
        <div className="container">
            <div className="form-box login-box">
                <div className="header-form">
                    <FontAwesomeIcon
                        size='5x'
                        icon={faCircleUser}
                        color='#3A9AB9'
                    />
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={userSchema}
                    onSubmit={async (values, {resetForm, setErrors}) => {
                        const response = await userStore.login(values.email, values.password)
                        if(!response.message) {
                            resetForm()
                            navigate(-1)
                        }
                        setErrors( { [response.errors.field]: response.message })
                    }}
                >
                    {({errors, touched}) => (
                        <Form className='loginForm'>
                            <div className={`${touched.email && errors.email ? 'error-icon' : null} formik-field-container`}>
                            <FontAwesomeIcon
                                width='40px'
                                icon={faAt}
                                color='#3A9AB9'
                            />
                            <Field
                                placeholder='Email'
                                name='email'
                                type='email'
                                className={`${touched.email && errors.email ? 'error-field' : null} formik-field`}
                            />
                            </div>
                            <ErrorMessage component='div' className='custom-error-message' name='email'/>

                            <div className={`${touched.password && errors.password ? 'error-icon' : null} formik-field-container`}>
                                <FontAwesomeIcon
                                    width='40px'
                                    icon={faLock}
                                    color='#3A9AB9'
                                />
                                <Field
                                    name='password'
                                    className={`${touched.password && errors.password ? 'error-field' : null} formik-field`}
                                >
                                    {({ field, meta }:FieldProps) => (
                                        <div className='password-container'>
                                            <input
                                                {...field}
                                                type={`${passwordIsVisible ? 'text' : 'password'}`}
                                                placeholder='Password'
                                                className={`${meta.touched && meta.error ? 'error-field' : null} password-input`}
                                            />
                                            <FontAwesomeIcon
                                                onClick={changePasswordVisibility}
                                                className='password-image'
                                                width='15px'
                                                icon={currentIcon}
                                                color='#446244'
                                            />
                                        </div>

                                    )}
                                </Field>
                            </div>
                            <ErrorMessage component='div' className='custom-error-message' name='password'/>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    fontFamily: 'Avenir, sans-serif',
                                    fontSize: '1.5rem',
                                    height: '38px',
                                    marginTop:'20px',
                                    width: '100%'
                                }}
                            >
                                Log in!
                            </Button>

                        </Form>
                    )}
                </Formik>
                <div className='auth-link-container'>
                    <Link to='../signin' className='auth-link'>Have not account yet? Sign in!</Link>
                </div>
            </div>
        </div>
    );
};

