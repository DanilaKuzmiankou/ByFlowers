import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import basketStore from "../../store/BasketStore";
import {observer} from "mobx-react-lite";
import * as Yup from "yup";
import {phoneRegExp} from "../../utils/Utils";
import userStore from "../../store/UserStore";
import {Form, Formik} from "formik";
import {NameField} from "../Form/NameField";
import {PhoneField} from "../Form/PhoneField";
import {RefObject, useEffect, useRef, useState} from "react";
import {completeOrder, getRussianCities} from "../../api/store/Basket";
import {CityAutocomplete} from "../Form/CityAutocomplete";
import {RussianCity} from "../../models/GetRussianCitiesResponse";
import {buyButtonHoverStyle, productStyles} from "../../themes";
import * as React from "react";
import Box from "@mui/material/Box";
import {CityAutocompleteProps, CountInputProps} from "../../models/IProduct";


const deliverySchema = Yup.object({
    name: Yup.string().max(100, 'must_be_100_characters_or_less').required('required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('required')
})


const navbarLoginButtonStyle = {
    width: "90px",
    height: '35px',
    fontSize: '1.2rem',
    fontWeight: 700,
    lineHeight: 2.4,
    textAlign: "center",
    borderRadius: "3px",
    color: "#fff",
    textTransform: "uppercase",
    textDecoration: "none",
    border: "0",
    fontFamily: 'IntroCondBlack',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(200,205,208)',
    background: 'linear-gradient(to left, rgba(200,205,208,1) 50%, rgba(130,134,136,1) 50%) right',
    backgroundSize: '200%',
    transition: '.3s ease-out',
    '&:hover': {
        backgroundPosition: 'left'
    }


}

export const CompleteOrder = observer(() => {

    const formikRef = useRef() as RefObject<any>;
    const cityAutocompleteRef = useRef<CityAutocompleteProps>(null)

    const [cities, setCities] = useState<RussianCity[]>([])

    const handleClose = () => {
        basketStore.setIsCompleteOrderOpen(false)
        setTimeout(() => {
            formikRef?.current?.resetForm()
        }, 100)
    }

    const submitForm = () => {
        formikRef?.current?.handleSubmit()
    }

    useEffect(() => {
        async function fetch() {
            const response = await getRussianCities()
            setCities(response?.data?.results)
        }
        fetch()
    }, [])

    return (
        <Dialog
            fullWidth
            maxWidth='xs'
            keepMounted
            open={basketStore.isCompleteOrderOpen}
            onClose={handleClose}
        >
            <DialogTitle sx={{
                textAlign: 'center',
                fontFamily: 'inherit',
                fontSize: '2.0rem'
        }}
            >
                Confirm order
            </DialogTitle>
            <DialogContent>

                <Formik
                    innerRef={formikRef}
                    enableReinitialize
                    initialValues={{
                        name: userStore.user.name || '',
                        phone: userStore.user.phone || ''
                    }}
                    validationSchema={deliverySchema}
                    onSubmit={async (values, {resetForm, setErrors}) => {
                        if (cityAutocompleteRef.current) {
                            const city = cityAutocompleteRef.current.getCity()
                            if(city) {
                                const response = await completeOrder(userStore.user.email, values.name, values.phone, city)
                                if(response.status===200) basketStore.clearBasket()
                            }
                            else {
                                cityAutocompleteRef.current.setFieldIsRequired()
                            }
                        }
                        // let cities:string[] = []
                        // response.data.results.map((city) => {
                        //     cities.push(city.name)
                        // })
                        // console.log('res', cities)
                        // const response = await userStore.login(values.email, values.password)
                        // if(!response.message) {
                        //     resetForm()
                        //     navigate(-1)
                        // }
                        // setErrors( { [response.errors.field]: response.message })
                    }}
                >
                    {({values, errors, touched, handleBlur, handleChange}) => (
                        <Form>

                            <NameField isNameFieldTouched={touched.name} nameFieldErrors={errors.name} />

                            <PhoneField
                                isPhoneFieldTouched={touched.phone}
                                phoneFieldErrors={errors.phone}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                />

                            <CityAutocomplete ref={cityAutocompleteRef} cities={cities} />

                        </Form>
                    )}
                </Formik>
                <Box sx={{ display: 'flex', mt: '10px'}}>
                <Typography
                    sx={{...productStyles.customBoldFont, ...{display: 'inline-block'}}}>
                    Order Total
                </Typography>
                <Typography
                    sx={{...productStyles.customBoldFont, ...{display: 'inline-block', marginLeft: 'auto'}}}>
                    {basketStore.basketOrderTotal}$
                </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained"
                        sx={navbarLoginButtonStyle} onClick={handleClose}>Cancel</Button>
                <Button sx={{...buyButtonHoverStyle, ...{width: "90px", mr: '20px', height: '35px', fontSize: '1.2rem', fontWeight: 700}}} onClick={submitForm}>Order</Button>
            </DialogActions>
        </Dialog>
    );
});

