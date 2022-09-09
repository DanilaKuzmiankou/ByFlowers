import React, { useMemo } from 'react'
import { Grid, Typography } from '@mui/material'
import {
  BsDroplet,
  BsScissors,
  BsThermometerSun,
} from 'react-icons/bs'
import { IconContext } from 'react-icons'
import { productStyles } from '../../themes'

const gridColumn = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}

const headerStyle = {
  ...productStyles.customNormalFont,
  ...{ fontSize: '2rem', margin: '10px 0 5px', fontWeight: 600 },
}

export const FlowerCareGuide = () => {
  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '63' }), [])

  return (
    <>
      <Typography
        sx={{
          ...productStyles.customBoldFont,
          ...productStyles.headerTypographyStyle,
        }}
      >
        Flower care guide
      </Typography>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '20px',
          width: '100%',
        }}
        spacing={2}
      >
        <Grid item xs={12} sm={4} sx={gridColumn}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsDroplet />
          </IconContext.Provider>
          <Typography sx={headerStyle}>Water</Typography>
          <Typography sx={productStyles.customSmallFont}>
            Change vase water every other day (add flower food to the new water
            if available). All stems should be submerged. If your flowers came
            in a basket or other container with foam, add fresh water every day.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={gridColumn}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsThermometerSun />
          </IconContext.Provider>
          <Typography sx={headerStyle}>Light/Temperature</Typography>
          <Typography sx={productStyles.customSmallFont}>
            Display your bouquet or flower arrangement in a cool, draft-free
            area. <br />
            Avoid direct sunlight, which causes the flowers to die more quickly.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={gridColumn}>
          <IconContext.Provider value={iconPropsMemoized}>
            <BsScissors />
          </IconContext.Provider>
          <Typography sx={headerStyle}>Pruning</Typography>
          <Typography sx={productStyles.customSmallFont}>
            Immediately remove dead or wilting leaves and stems. <br />
            Recut your flower and foliage stems just before putting them back
            into new water.
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
