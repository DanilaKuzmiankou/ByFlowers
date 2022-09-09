import React, { useMemo, useState } from 'react'
import { Collapse, Grid, Typography } from '@mui/material'
import { BsDroplet, BsScissors, BsSun, BsThermometerSun } from 'react-icons/bs'
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
            },
          }}
        >
          Flower care guide
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
              <BsDroplet />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Water</Typography>
            <Typography sx={productStyles.customNormalFont}>
              Change vase water every other day (add flower food to the new
              water if available). All stems should be submerged. If your
              flowers came in a basket or other container with foam, add fresh
              water every day.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsThermometerSun />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Light/Temperature</Typography>
            <Typography sx={productStyles.customNormalFont}>
              Display your bouquet or flower arrangement in a cool, draft-free
              area. <br />
              Avoid direct sunlight, which causes the flowers to die more
              quickly.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={gridColumn}>
            <IconContext.Provider value={iconPropsMemoized}>
              <BsScissors />
            </IconContext.Provider>
            <Typography sx={headerStyle}>Pruning</Typography>
            <Typography sx={productStyles.customNormalFont}>
              Immediately remove dead or wilting leaves and stems. <br />
              Recut your flower and foliage stems just before putting them back
              into new water.
            </Typography>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
