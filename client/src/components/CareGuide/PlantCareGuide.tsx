import { useMemo, useState } from 'react'
import { Collapse, Grid, Typography } from '@mui/material'
import { BsDroplet, BsSun } from 'react-icons/bs'
import { GiFertilizerBag } from 'react-icons/gi'
import { IconContext } from 'react-icons'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
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
            },
          }}
        >
          Plant care guide
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
            <Typography sx={headerStyle}>Light</Typography>
            <Typography sx={productStyles.customNormalFont}>
              If you don’t know where to put a plant, put it in the window. Most
              of plants need as much sunlight as possible. Different plants come
              from different parts of the world and have different light
              requirements.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsDroplet />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Water</Typography>
            <Typography sx={productStyles.customNormalFont}>
              Water on an as-needed basis rather than by a set calendar
              schedule. Plants grown in well-drained soil in an appropriate-size
              container should be watered when the top 1/2 to 1 inch of soil
              feels dry
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <GiFertilizerBag />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Fertilizing</Typography>
            <Typography sx={productStyles.customNormalFont}>
              Most houseplants put on a growth spurt in spring and summer, so
              this is the best time to fertilize them. It&apos;s important to
              avoid overfertilizing your houseplants. Too much fertilizer can
              burn their roots and stunt their growth
            </Typography>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
