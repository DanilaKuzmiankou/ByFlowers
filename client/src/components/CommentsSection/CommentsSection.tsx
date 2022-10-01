import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import './CommentsSection.css'

const commentHeaderStyle = {
  margin: '50px 20px 200px',
  '&::before': {
    content: 'open-quote',
  },
  '&::after': {
    content: 'close-quote',
  },
}

const commentDescriptionStyle = {
  width: '100%',
  position: 'absolute',
  bottom: '100px',
  left: '50%',
  transform: 'translate(-50%, 0)',
}

const commentTypographyStyle = {
  fontFamily: 'MabryPro, sans-serif',
  color: '#3f0791',
  fontSize: '2rem',
}

const commentPhoto = {
  position: 'absolute',
  bottom: '-80px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  objectFit: 'cover',
  borderRadius: '100%',
  height: '160px',
  width: '165px',
}

export const CommentsSection = () => {
  return (
    <div className="comments">
      <Grid container spacing={2} rowSpacing={13}>
        <Grid item xs={12} md={4}>
          <div data-aos="zoom-in-right" className="comment">
            <Typography
              sx={{ ...commentTypographyStyle, ...commentHeaderStyle }}
            >
              Спасибо за ваш сервис. Для меня это бесценно! Я живу очень далеко
              от мамы, и каждый раз, заказанные мной у вас букеты умиляют её до
              слез. Служба поддержки работает качественно и быстро. Еще раз
              спасибо!
            </Typography>
            <div data-aos="fade-up" className="comment-description">
              <Typography
                sx={{ ...commentTypographyStyle, ...commentDescriptionStyle }}
              >
                Александр Кузнецов
              </Typography>
              <Box
                component="img"
                sx={commentPhoto}
                src={require('../../assets/images/human1.jpg')}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div data-aos="zoom-in-up" className="comment">
            <Typography
              sx={{ ...commentTypographyStyle, ...commentHeaderStyle }}
            >
              Большое спасибо за ваши услуги. Это был мой первый опыт покупки
              цветов у вас, и я очень беспокоилаь. Букет был очень красивый,
              превзошел мои ожидания! Теперь буду чаще пользоваться вашими
              услугами! Фото отчет поднял настроение с утра! Молодцы ребята! Так
              держать!
            </Typography>
            <div data-aos="fade-up" className="comment-description">
              <Typography
                sx={{ ...commentTypographyStyle, ...commentDescriptionStyle }}
              >
                Дарья Вознесенская
              </Typography>
              <Box
                component="img"
                sx={commentPhoto}
                src={require('../../assets/images/human2.jpg')}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div data-aos="zoom-in-up" className="comment">
            <Typography
              sx={{ ...commentTypographyStyle, ...commentHeaderStyle }}
            >
              Спасибо за ваш магазин, всегда выручал меня при выборе подарка.
              Большой выбор растений, огромный выбор букетов, доступные цены,
              удобный интерфейс сайта, вежливые операторы, индивидуальный подход
              к клиенту. Отдельное спасибо за промокод на следующий заказ!
              &#9786;
            </Typography>
            <div data-aos="fade-up" className="comment-description">
              <Typography
                sx={{ ...commentTypographyStyle, ...commentDescriptionStyle }}
              >
                Ирина Вишневская
              </Typography>
              <Box
                component="img"
                sx={commentPhoto}
                src={require('../../assets/images/human3.jpg')}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
