import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { productStyles } from '../../themes'
import { CITIES, RUBLE_SIGN } from '../../utils/Utils'

const description = {
  fontFamily: 'AvenirRegular, sans-serif',
  fontSize: '2.6rem',
  fontWeight: '200 !important',
  width: 'available',
  textAlign: 'justify',
  whiteSpace: 'pre-line',
  textIndent: '40px',
}

const header = {
  fontFamily: 'AvenirBold, sans-serif',
  fontSize: {
    lg: '4rem',
    sm: '3.6rem',
    xs: '3rem',
  },
  fontWeight: '200 !important',
  letterSpacing: '0 !important',
  whiteSpace: 'word',
  textAlign: 'center',
  mb: '10px',
}

const subHeader = {
  fontFamily: 'AvenirBold, sans-serif',
  fontSize: {
    lg: '2.8rem',
    sm: '2.4rem',
    xs: '2rem',
  },
  fontWeight: '200 !important',
  letterSpacing: '0 !important',
  whiteSpace: 'word',
  mt: {
    xl: '20px',
    xxl: 0,
  },
}

const pictureStyle = {
  height: {
    xs: '310px',
    md: '550px',
    xl: '550px',
  },
  width: {
    xs: '310px',
    md: '550px',
    xl: '550px',
  },
}

const mainContainer = {
  width: '100%',
  padding: { xs: '20px', md: '40px' },
  backgroundColor: '#F4F4E3',
}

const deliveryDescription = {
  display: 'flex',
  flexDirection: {
    xs: 'column',
    xl: 'row',
  },
  alignItems: {
    xs: 'center',
    xl: 'start',
  },
}

const citiesTypography = {
  ...productStyles.productDescriptionFont,
  ...{
    whiteSpace: 'pre-line',
    mt: '10px',
    textAlign: 'center`',
  },
}

const citiesColumn = {
  display: 'flex',
  justifyContent: { sm: 'left', md: 'center' },
}

const cities = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  m: '0 0 20px',
}

export const Delivery = () => {
  return (
    <Box sx={mainContainer}>
      <Typography sx={header}>Условия доставки</Typography>
      <Box sx={deliveryDescription}>
        <Box>
          <Typography sx={description}>
            Мы доставляем цветы в 212 городов России. Доставить наш букет мы
            сможем через 2 часа после оформления заказа или быстрее. Доставка по
            Москве осуществляется круглосуточно, при оплате букета до 20.00.
            Стоимость доставки в Москве – 450 {RUBLE_SIGN}. Возможны задержки по
            времени. Стоимость доставки с 20:00 до 21:00 – 800 {RUBLE_SIGN}.
            Доставка по отдаленным районам – от 600 {RUBLE_SIGN}. Возможна
            срочная доставка по городу Москва и МО - до 2 часов. Срочная
            доставка цветов не осуществляется в праздники - Новый год, День
            Святого Валентина, 8 Марта, День Матери и предпраздничные дни. При
            оформлении заказа укажите телефон получателя местного сотового
            оператора, чтобы флористы дозвонились до получателя при
            необходимости.
          </Typography>
          <Typography sx={description}>
            При доставке в гостиницу или офисный центр, мы гарантируем доставку
            только до ресепшена, так как курьера могут не пропустить к
            гостиничному номеру или офисному кабинету. Если получатель будет
            отсутствовать на рабочем месте, курьер оставит заказ у коллег, если
            они подтвердят, что получатель в этот день на работе. При передаче
            заказа курьер сообщает получателю о том, что доставленный букет
            оплачен.
          </Typography>
          <Typography sx={description}>
            Мы не говорим имя заказчика и не передаём любые иные сведения. К
            цветам прилагается бесплатная открытка, в которой вы можете указать
            всё, что посчитаете нужным
          </Typography>
        </Box>
        <Box
          component="img"
          sx={pictureStyle}
          src={require('../../assets/images/delivery.png')}
        />
      </Box>
      <Typography sx={subHeader}>Стоимость доставки по области:</Typography>
      <Grid columns={24} container sx={cities}>
        <Grid item xs={24} xl={7} md={8} sx={citiesColumn}>
          <Typography sx={citiesTypography}>
            Путилково – 800 {RUBLE_SIGN} <br />
            Реутов – 950 {RUBLE_SIGN} <br />
            Щербинка – 950 {RUBLE_SIGN} <br />
            Митино – 800 {RUBLE_SIGN} <br />
            Трехгорка – 800 {RUBLE_SIGN} <br />
          </Typography>
        </Grid>
        <Grid item xs={24} xl={7} md={8} sx={citiesColumn}>
          <Typography sx={citiesTypography}>
            Некрасовка – 1300 {RUBLE_SIGN} <br />
            посёлок Сосенское – 800 {RUBLE_SIGN} <br />
            Воскресенское – 1400 {RUBLE_SIGN} <br />
            СОТ «МЕЧТА» – 1200 {RUBLE_SIGN} <br />
            посёлок Мещерино – 1900 {RUBLE_SIGN} <br />
          </Typography>
        </Grid>
        <Grid item xs={24} xl={7} md={8} sx={citiesColumn}>
          <Typography sx={citiesTypography}>
            поселение Московский – 1350 {RUBLE_SIGN} <br />
            Метро Селигерская – 900 {RUBLE_SIGN} <br />
            г.Московский – 1700 {RUBLE_SIGN} <br />
            РП Дрожжино – 1700 {RUBLE_SIGN} <br />
            Язово – 1200 {RUBLE_SIGN} <br />
          </Typography>
        </Grid>
      </Grid>
      <Typography sx={subHeader}>
        Мы доставляем цветы в следующие города России:
      </Typography>
      <Grid columns={24} container sx={cities} spacing={{ sm: 4 }}>
        <Grid item xs={12} xl={5} sm={6} sx={citiesColumn}>
          <Typography sx={citiesTypography}>
            {CITIES.slice(0, 53).map((city) => `${city} \n`)}
          </Typography>
        </Grid>
        <Grid item xs={12} xl={5} sm={6} sx={citiesColumn}>
          <Typography sx={citiesTypography}>
            {CITIES.slice(53, 106).map((city) => `${city} \n`)}
          </Typography>
        </Grid>
        <Grid item xs={12} xl={5} sm={6} sx={citiesColumn}>
          <Typography sx={citiesTypography}>
            {CITIES.slice(106, 159).map((city) => `${city} \n`)}
          </Typography>
        </Grid>
        <Grid item xs={12} xl={5} sm={6} sx={citiesColumn}>
          <Typography sx={citiesTypography}>
            {CITIES.slice(159, CITIES.length).map((city) => `${city} \n`)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
