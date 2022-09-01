import {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser,} from "@fortawesome/free-solid-svg-icons";
import {ErrorMessage, Field} from "formik";

interface NameField {
    isNameFieldTouched: boolean|undefined,
    nameFieldErrors: string|undefined,
}

export const NameField:FC<NameField> = ({ isNameFieldTouched, nameFieldErrors }) => {
    return (
        <>
            <div className={`${isNameFieldTouched && nameFieldErrors ? 'error-icon' : null} formik-field-container`}>
                <FontAwesomeIcon
                    width='40px'
                    icon={faUser}
                    color='#3A9AB9'
                />
                <Field
                    placeholder='Name'
                    name='name'
                    type='text'
                    className={`${isNameFieldTouched && nameFieldErrors ? 'error-field' : null} formik-field`}
                />
            </div>
            <ErrorMessage component='div' className='custom-error-message' name='name'/>
        </>
    );
};

