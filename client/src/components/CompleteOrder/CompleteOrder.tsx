import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import { Form, Formik, FormikValues } from 'formik'
import { RefObject, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import basketStore from '../../store/BasketStore'
import { phoneRegExp, RUBLE_SIGN } from '../../utils/Utils'
import userStore from '../../store/UserStore'
import { NameField } from '../Form/NameField'
import { PhoneField } from '../Form/PhoneField'
import { completeOrder, getRussianCities } from '../../api/store/Basket'
import { CityAutocomplete } from '../Form/CityAutocomplete'
import { RussianCity } from '../../models/GetRussianCitiesResponse'
import { buyButtonHoverStyle, productStyles } from '../../themes'
import { CityAutocompleteProps } from '../../models/IProduct'

const deliverySchema = Yup.object({
  name: Yup.string()
    .max(100, 'must_be_100_characters_or_less')
    .required('required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
})

const cancelButtonStyle = {
  width: '90px',
  height: '35px',
  fontSize: '1.2rem',
  fontWeight: 700,
  lineHeight: 2.4,
  textAlign: 'center',
  borderRadius: '3px',
  color: '#fff',
  textTransform: 'uppercase',
  textDecoration: 'none',
  border: '0',
  fontFamily: 'IntroCondBlack',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(200,205,208)',
  background:
    'linear-gradient(to left, rgba(200,205,208,1) 50%, rgba(197,197,197,1) 50%) right',
  backgroundSize: '200%',
  transition: '.3s ease-out',
  '&:hover': {
    backgroundPosition: 'left',
  },
}

const orderButton = {
  width: '90px',
  mr: '20px',
  height: '35px',
  fontFamily: 'IntroCondBlack',
  fontSize: '1.2rem',
  fontWeight: 700,
}

const completedOrderContainer = {
  minHeight: '350px',
  backgroundColor: '#edf4ec',
  color: '#2ecc71',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}

export const CompleteOrder = observer(() => {
  const formikRef = useRef() as RefObject<any>
  const cityAutocompleteRef = useRef<CityAutocompleteProps>(null)

  const [cities, setCities] = useState<RussianCity[]>([])
  const [isOrderCompleted, setIsOrderCompleted] = useState<boolean>(false)

  const handleClose = () => {
    basketStore.setIsCompleteOrderOpen(false)
    setTimeout(() => {
      formikRef?.current?.resetForm()
    }, 100)
  }

  const startOnSubmit = () => {
    formikRef?.current?.handleSubmit()
  }

  const closeCompleteOrderWindow = () => {
    setTimeout(() => {
      setIsOrderCompleted(false)
    }, 100)
    basketStore.setIsCompleteOrderOpen(false)
  }

  useEffect(() => {
    async function fetch() {
      const response = await getRussianCities()
      setCities(response?.data?.results)
    }

    fetch()
  }, [])

  const submitForm = async (values: FormikValues) => {
    if (cityAutocompleteRef.current) {
      const city = cityAutocompleteRef.current.getCity()
      if (city) {
        const response = await completeOrder(
          userStore.user.email,
          values.name,
          values.phone,
          city,
        )
        if (response.status === 200) {
          basketStore.setIsBasketOpen(false)
          basketStore.clearBasket()
          setIsOrderCompleted(true)
        }
      } else {
        cityAutocompleteRef.current.setFieldIsRequired()
      }
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      keepMounted
      open={basketStore.isCompleteOrderOpen}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontFamily: 'inherit',
          fontSize: '2.0rem',
        }}
      >
        Подтверждение заказа
      </DialogTitle>
      <DialogContent>
        {isOrderCompleted ? (
          <Box sx={completedOrderContainer}>
            <Box
              component="img"
              sx={{ height: '70px', width: '70px', display: 'block' }}
              alt="Confirmed Check Mark."
              src={require('../../assets/images/orderConfirmedCheckMark.png')}
            />
            <Typography
              sx={{
                ...productStyles.customNormalFont,
                ...{ display: 'inline-block', color: 'inherit' },
              }}
            >
              Спасибо за ваш заказ! <br />
              Наш менеджер позвонит вам в ближайшее время!
            </Typography>
          </Box>
        ) : (
          <>
            <Formik
              innerRef={formikRef}
              enableReinitialize
              initialValues={{
                name: userStore.user?.name || '',
                phone: userStore.user?.phone || '',
              }}
              validationSchema={deliverySchema}
              onSubmit={async (values) => {
                submitForm(values)
              }}
            >
              {({ errors, touched, handleBlur, handleChange }) => (
                <Form>
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

                  <CityAutocomplete ref={cityAutocompleteRef} />
                </Form>
              )}
            </Formik>
            <Box sx={{ display: 'flex', mt: '10px' }}>
              <Typography
                sx={{
                  ...productStyles.customBoldFont,
                  ...{ display: 'inline-block' },
                }}
              >
                Общая стоимость
              </Typography>
              <Typography
                sx={{
                  ...productStyles.customBoldFont,
                  ...{
                    display: 'inline-block',
                    marginLeft: 'auto',
                  },
                }}
              >
                {basketStore.basketOrderTotal} {RUBLE_SIGN}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: `${isOrderCompleted ? 'center' : ''}` }}
      >
        {isOrderCompleted ? (
          <Button
            sx={{ ...buyButtonHoverStyle, ...orderButton, ...{ mr: 0 } }}
            onClick={closeCompleteOrderWindow}
          >
            Ок
          </Button>
        ) : (
          <>
            <Button sx={cancelButtonStyle} onClick={handleClose}>
              Отмена
            </Button>
            <Button
              sx={{ ...buyButtonHoverStyle, ...orderButton }}
              onClick={startOnSubmit}
            >
              Заказать
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
})
