import { ChangeEventHandler, FC, FocusEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { ErrorMessage, Field, FieldProps } from 'formik'
import InputMask from 'react-input-mask'
import './Form.css'

interface PhoneFieldProps {
  isPhoneFieldTouched: boolean | undefined
  phoneFieldErrors: string | undefined
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleBlur: FocusEventHandler<HTMLInputElement>
}

export const PhoneField: FC<PhoneFieldProps> = ({
  isPhoneFieldTouched,
  phoneFieldErrors,
  handleBlur,
  handleChange,
}) => (
  <>
    <div
      className={`${
        isPhoneFieldTouched && phoneFieldErrors ? 'error-icon' : null
      } formik-field-container`}
    >
      <FontAwesomeIcon
        className="icon"
        width="40px"
        icon={faPhone}
        color="#3A9AB9"
      />
      <Field name="phone">
        {({ field }: FieldProps) => (
          <InputMask
            {...field}
            mask="+7 (999) 999-99-99"
            maskPlaceholder="_"
            placeholder="Телефон"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${
              isPhoneFieldTouched && phoneFieldErrors ? 'error-field' : null
            } formik-field`}
          />
        )}
      </Field>
    </div>
    <ErrorMessage
      component="div"
      className="custom-error-message"
      name="phone"
    />
  </>
)
