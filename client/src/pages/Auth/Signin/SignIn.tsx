import React, {useState} from 'react';
import '../Auth.css'
import InputMask from "react-input-mask";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {ErrorMessage, Field, Form, Formik, FieldProps} from "formik";
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import userStore from "../../../store/UserStore";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {IUser} from "../../../models/IUser";

YupPassword(Yup);

const phoneRegExp = /^[^\d\n]*(?:\d[^\d\n]*){12}$/

const userSchema = Yup.object({
    name: Yup.string().max(100, 'must_be_100_characters_or_less').required('required'),
    email: Yup.string().nullable().email().required('required'),
    password: Yup.string().required('required')
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('required')
})

export const Signin = () => {

    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
    const [currentIcon, setCurrentIcon] = useState<IconDefinition>(faEyeSlash)
    const navigate = useNavigate();

    const changePasswordVisibility = () => {
        setPasswordIsVisible(!passwordIsVisible)
        setCurrentIcon(currentIcon===faEye?faEyeSlash:faEye)
    }

    return (
        <div className="container">
            <div className="form-box signin-box">
                <div className="header-form">
                    <FontAwesomeIcon
                        size='5x'
                        icon={faCircleUser}
                        color='#3A9AB9'
                    />
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        phone: ''
                    }}
                    validationSchema={userSchema}
                    onSubmit={async (values, {resetForm, setErrors}) => {
                        const response = await userStore.registration(values.email, values.password, values.phone, values.name)
                        if(!response.message) {
                            resetForm()
                            navigate(-2)
                        }
                        setErrors( { [response.errors.field]: response.message })
                    }}
                >
                    {({errors, touched, handleBlur, handleChange}) => (
                        <Form className='loginForm'>
                            <div className={`${touched.name && errors.name ? 'error-icon' : null} formik-field-container`}>
                                <FontAwesomeIcon
                                    width='40px'
                                    icon={faUser}
                                    color='#3A9AB9'
                                />
                                <Field
                                    placeholder='Enter your name'
                                    name='name'
                                    type='text'
                                    className={`${touched.name && errors.name ? 'error-field' : null} formik-field`}
                                />
                            </div>
                            <ErrorMessage component='div' className='custom-error-message' name='name'/>

                            <div className={`${touched.phone && errors.phone ? 'error-icon' : null} formik-field-container`}>
                                <FontAwesomeIcon
                                    width='40px'
                                    icon={faPhone}
                                    color='#3A9AB9'
                                />
                                <Field
                                    name='phone'
                                >
                                    {({ field }:FieldProps) => (
                                        <InputMask
                                            {...field}
                                            mask="+375 99 999-99-99"
                                            maskPlaceholder="_"
                                            placeholder='Enter your phone'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`${touched.phone && errors.phone ? 'error-field' : null} formik-field`}
                                        />
                                        )}
                                </Field>
                            </div>
                            <ErrorMessage component='div' className='custom-error-message' name='phone'/>

                            <div className={`${touched.email && errors.email ? 'error-icon' : null} formik-field-container`}>
                            <FontAwesomeIcon
                                width='40px'
                                icon={faAt}
                                color='#3A9AB9'
                            />
                            <Field
                                placeholder='Enter your email'
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
                                                placeholder='Enter your password'
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
                                Sign in!
                            </Button>
                        </Form>
                    )}
                </Formik>
                <div className='auth-link-container'>
                    <Link to='../login' className='auth-link'>Already have an account? Log in!</Link>
                </div>
            </div>
        </div>
    );
};

