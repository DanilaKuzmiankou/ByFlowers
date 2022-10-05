import { useMemo, useState } from 'react'
import { Collapse, Grid, Typography } from '@mui/material'
import { BsDroplet, BsScissors, BsThermometerSun } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import Box from '@mui/material/Box'
import { productStyles } from '../../themes'
import { ExpandButton } from '../ExpandButton/ExpandButton'

const gridColumn = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}

const headerStyle = {
  ...productStyles.customNormalFont,
  ...{ fontSize: '2rem', margin: '5px 0 5px', fontWeight: 600 },
}

export const FlowerCareGuide = () => {
  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '63' }), [])
  const [isTabOpen, setIsTabOpen] = useState<boolean>(true)

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{
            ...productStyles.customBoldFont,
            ...productStyles.headerTypographyStyle,
            ...{
              color: isTabOpen ? '#FF0054' : '#000000',
              whiteSpace: 'normal',
              userSelect: 'none',
            },
          }}
          onClick={() => setIsTabOpen(!isTabOpen)}
        >
          Руководство по уходу за цветами
        </Typography>
        <ExpandButton isTabOpen={isTabOpen} setIsTabOpen={setIsTabOpen} />
      </Box>
      <Collapse in={isTabOpen} timeout="auto">
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5px',
            width: '100%',
          }}
          spacing={4}
        >
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsDroplet />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Вода</Typography>
            <Typography sx={productStyles.productDescriptionFont}>
              Меняйте воду в вазе через день (добавляйте подкормку для цветов в
              новую воду, если она есть). Все стебли должны быть погружены в
              воду. Если ваши цветы пришли в корзине или другом контейнере с
              пеной, добавляйте свежую воду каждый день.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsThermometerSun />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Свет/Температура</Typography>
            <Typography sx={productStyles.productDescriptionFont}>
              Повесьте свой букет или цветочную композицию в прохладном месте
              без сквозняков. Избегайте прямых солнечных лучей, от которых цветы
              быстрее погибают.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsScissors />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Подрезка</Typography>
            <Typography sx={productStyles.productDescriptionFont}>
              Немедленно удаляйте отмершие или увядающие листья и стебли.
              Обрежьте стебли цветов и листвы непосредственно перед тем, как
              положить их обратно. в новую воду.
            </Typography>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
