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
              Thanks for your service. For us it is priceless! Since I live very
              far from my mother, and every time she is touched to tears by your
              bouquets sent by her beloved daughter. So the support service
              works perfectly quickly and sincerely. Thank you again!
            </Typography>
            <div data-aos="fade-up" className="comment-description">
              <Typography
                sx={{ ...commentTypographyStyle, ...commentDescriptionStyle }}
              >
                Manuel Sanchez
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
              Thank you very much for your services. This was my first
              experience and I am very worried. The bouquet was very beautiful,
              exceeded my expectations! Now I will use your services more often
              and please my friends. relatives at a distance! The photo report
              lifted my spirits in the morning! Well done boys! Keep it up!
            </Typography>
            <div data-aos="fade-up" className="comment-description">
              <Typography
                sx={{ ...commentTypographyStyle, ...commentDescriptionStyle }}
              >
                Isabel Perez
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
              Thank you for your store, it always helped me out when choosing a
              gift. Large selection of countries, a huge selection of bouquets,
              reasonable prices, user-friendly interface of the site, polite
              operators, personal approach to client. Special thanks for the
              promo code for the next order! &#9786;
            </Typography>
            <div data-aos="fade-up" className="comment-description">
              <Typography
                sx={{ ...commentTypographyStyle, ...commentDescriptionStyle }}
              >
                Johanna Lehtonen
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
