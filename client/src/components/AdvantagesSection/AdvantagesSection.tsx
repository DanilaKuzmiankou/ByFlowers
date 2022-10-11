import { Grid, Typography } from '@mui/material'
import { IconContext } from 'react-icons'
import { RiPlantLine } from 'react-icons/ri'
import { FiTruck } from 'react-icons/fi'
import './AdvantagesSection.css'
import { BsCoin } from 'react-icons/bs'
import { useMemo } from 'react'
import { productStyles } from '../../themes'

export const AdvantagesSection = () => {
  const column = {
    maxWidth: { sm: '350px' },
  }
  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '63' }), [])

  return (
    <div className="advantages">
      <div className="advantages-header">
        <Typography
          sx={{
            ...productStyles.customBoldFont,
            ...productStyles.headerTypographyStyle,
            ...{ whiteSpace: 'word', textAlign: 'center' },
          }}
        >
          Наши преимущества
        </Typography>
      </div>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} sm={12} md={4}>
          <div className="advantages-container">
            <IconContext.Provider value={iconPropsMemoized}>
              <RiPlantLine />
            </IconContext.Provider>
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...{ whiteSpace: 'no-wrap', mb: '6px' },
              }}
            >
              Гарантия качества
            </Typography>
            <Typography sx={{ ...productStyles.customSmallFont, ...column }}>
              Гарантируем, что внешний вид и описание цветов в магазине будет
              соответстовать доставленным, либо мы оперативно вернем деньги.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <div className="advantages-container">
            <IconContext.Provider value={iconPropsMemoized}>
              <FiTruck />
            </IconContext.Provider>
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...{ whiteSpace: 'no-wrap', mb: '6px' },
              }}
            >
              Надежные поставщики
            </Typography>
            <Typography sx={{ ...productStyles.customSmallFont, ...column }}>
              Прямые доставки цветов и растений из Европы - всегда объёмный и
              уникальный ассортимент
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <div className="advantages-container">
            <IconContext.Provider value={iconPropsMemoized}>
              <BsCoin />
            </IconContext.Provider>
            <Typography
              sx={{
                ...productStyles.customBoldFont,
                ...{ whiteSpace: 'no-wrap', mb: '6px' },
              }}
            >
              Низкие цены
            </Typography>
            <Typography sx={{ ...productStyles.customSmallFont, ...column }}>
              Мы работаем напрямую с большими поставщиками и можем гарантировать
              цены ниже, чем у локальных магазинов.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
