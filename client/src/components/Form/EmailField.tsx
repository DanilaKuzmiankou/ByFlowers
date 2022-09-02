import {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import {ErrorMessage, Field} from "formik";
import './Form.css'

interface EmailField {
    isEmailFieldTouched: boolean|undefined,
    emailFieldErrors: string|undefined,
}

export const EmailField:FC<EmailField> = ({ isEmailFieldTouched, emailFieldErrors }) => {
    return (
        <>
            <div className={`${isEmailFieldTouched && emailFieldErrors ? 'error-icon' : null} formik-field-container`}>
                <FontAwesomeIcon
                    className='icon'
                    width='40px'
                    icon={faAt}
                    color='#3A9AB9'
                />
                <Field
                    placeholder='Email'
                    name='email'
                    type='email'
                    className={`${isEmailFieldTouched && emailFieldErrors ? 'error-field' : null} formik-field`}
                />
            </div>
            <ErrorMessage component='div' className='custom-error-message' name='email'/>
        </>
    );
};

