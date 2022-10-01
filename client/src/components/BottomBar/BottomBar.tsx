import Box from '@mui/material/Box'
import './BottomBar.css'
import { Typography } from '@mui/material'
import { productStyles } from '../../themes'

export const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="bottom-trademarks">
        <div className="bottom-brand">ByFlowers.ru</div>
        <div className="bottom-rights">
          Сайт, а также вся информация, представленная на сайте, носит
          исключительно информационный характер и ни при каких обстоятельствах
          не является публичной офертой.
        </div>
        <div className="bottom-rights">
          Для использования корзины необходима регистрация. Мы никогда, и ни при
          каких обстоятельствах, не раскрываем личные данные клиентов.
          Контактная информация будет использована только для подтвержения
          заказов.
        </div>
        <div className="bottom-rights">&copy;2021 Все права защищены</div>
      </div>
      <div className="right-panel">
        <div className="call-us">
          <Typography
            sx={{
              ...productStyles.customBoldFont,
              ...{
                whiteSpace: 'nowrap',
                textAlign: 'center',
                userSelect: 'text',
              },
            }}
          >
            +7 996 284 74 60
          </Typography>
          <Typography
            sx={{
              ...productStyles.customBoldFont,
              ...{
                whiteSpace: 'nowrap',
                textAlign: 'center',
                userSelect: 'text',
              },
            }}
          >
            byflowersru@gmail.com
          </Typography>
        </div>
        <div className="bottom-icons">
          <a
            target="_blank"
            href="https://www.instagram.com/flower-bel/"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              sx={{
                height: 45,
                width: 45,
                marginRight: '7px',
              }}
              src={require('../../assets/images/instagramIcon.png')}
            />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/groups/12688897134534643062353"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              sx={{
                height: 45,
                width: 45,
              }}
              src={require('../../assets/images/facebookIcon.png')}
            />
          </a>
        </div>
      </div>
    </div>
  )
}
