import {FC, MouseEventHandler} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {ErrorMessage, Field, FieldProps} from "formik";
import PasswordStrengthBar from "react-password-strength-bar";

interface PasswordField {
    isPasswordFieldTouched: boolean|undefined,
    passwordFieldErrors: string|undefined,
    passwordIsVisible: boolean,
    changePasswordVisibility: MouseEventHandler<SVGSVGElement>,
    currentIcon: IconDefinition
    showStrengthBar?: boolean
    password?: string
}

export const PasswordField:FC<PasswordField> = ({ isPasswordFieldTouched, passwordFieldErrors,
                                                    passwordIsVisible, changePasswordVisibility,
                                                    currentIcon, showStrengthBar = false,
                                                password}) => {
    return (
        <>
        <div className={`${isPasswordFieldTouched && passwordFieldErrors ? 'error-icon' : null} formik-field-container`}>
            <FontAwesomeIcon
                width='40px'
                icon={faLock}
                color='#3A9AB9'
            />
            <Field
                name='password'
                className={`${isPasswordFieldTouched && passwordFieldErrors ? 'error-field' : null} formik-field`}
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
            {showStrengthBar && isPasswordFieldTouched && !passwordFieldErrors ?
                <div style={{ width: '100%'}}>
                    <PasswordStrengthBar password={password} minLength={8} barColors={ ['#aca9a9', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}/>
                </div>
                : null
            }
    <ErrorMessage component='div' className='custom-error-message' name='password'/>
        </>
    );
};
