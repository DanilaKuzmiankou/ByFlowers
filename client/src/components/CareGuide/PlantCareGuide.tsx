import { useMemo, useState } from 'react'
import { Collapse, Grid, Typography } from '@mui/material'
import { BsDroplet, BsSun } from 'react-icons/bs'
import { GiFertilizerBag } from 'react-icons/gi'
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

export const PlantCareGuide = () => {
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
            },
          }}
        >
          Руководство по уходу за растениями
        </Typography>
        <ExpandButton isTabOpen={isTabOpen} setIsTabOpen={setIsTabOpen} />
      </Box>
      <Collapse in={isTabOpen} timeout="auto">
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px',
            width: '100%',
          }}
          spacing={4}
        >
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsSun />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Свет</Typography>
            <Typography sx={productStyles.productDescriptionFont}>
              Если вы не знаете, куда поставить растение, поставьте его на окно.
              Обычно растениям нужно как можно больше солнечного света. У нас
              есть самые разные растения из разных уголков мира и они имеют
              разный требования к свету.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsDroplet />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Вода</Typography>
            <Typography sx={productStyles.productDescriptionFont}>
              Поливайте по мере необходимости, а не по расписанию. Растения,
              выращенные в хорошо дренированной почве в соответствующем их
              размеру контейнере следует поливать, когда верхний слой почвы
              составляет от 1 до 2,5 сантиметров
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <GiFertilizerBag />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Удобрение</Typography>
            <Typography sx={productStyles.productDescriptionFont}>
              Весной и летом у большинства комнатных растений происходит всплеск
              роста, поэтому это лучшее время для их удобрения. Важно избегайте
              чрезмерного удобрения ваших комнатных растений. Слишком много
              удобрения может испортить их корни и остановить рост
            </Typography>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
