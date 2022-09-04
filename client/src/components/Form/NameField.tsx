import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { ErrorMessage, Field } from 'formik'
import './Form.css'

interface NameFieldProps {
  isNameFieldTouched: boolean | undefined
  nameFieldErrors: string | undefined
}

export const NameField: FC<NameFieldProps> = ({
  isNameFieldTouched,
  nameFieldErrors,
}) => (
  <>
    <div
      className={`${
        isNameFieldTouched && nameFieldErrors ? 'error-icon' : null
      } formik-field-container`}
    >
      <FontAwesomeIcon
        className="icon"
        width="40px"
        icon={faUser}
        color="#3A9AB9"
      />
      <Field
        placeholder="Name"
        name="name"
        type="text"
        className={`${
          isNameFieldTouched && nameFieldErrors ? 'error-field' : null
        } formik-field`}
      />
    </div>
    <ErrorMessage
      component="div"
      className="custom-error-message"
      name="name"
    />
  </>
)
