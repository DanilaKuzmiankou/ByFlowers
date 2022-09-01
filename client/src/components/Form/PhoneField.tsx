import {ChangeEventHandler, FC, FocusEventHandler} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import {ErrorMessage, Field, FieldProps} from "formik";
import InputMask from "react-input-mask";

interface PhoneField {
    isPhoneFieldTouched: boolean|undefined,
    phoneFieldErrors: string|undefined,
    handleChange:  ChangeEventHandler<HTMLInputElement>,
    handleBlur:  FocusEventHandler<HTMLInputElement>
}

export const PhoneField:FC<PhoneField> = ({ isPhoneFieldTouched, phoneFieldErrors, handleBlur, handleChange }) => {
    return (
        <>
            <div className={`${isPhoneFieldTouched && phoneFieldErrors ? 'error-icon' : null} formik-field-container`}>
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
                            placeholder='Phone'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${isPhoneFieldTouched && phoneFieldErrors ? 'error-field' : null} formik-field`}
                        />
                    )}
                </Field>
            </div>
            <ErrorMessage component='div' className='custom-error-message' name='phone'/>

        </>
    );
};