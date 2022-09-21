import { FC } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { productStyles } from '../../themes'

interface NoItemsPlugProps {
  text: string
  pictureHeight: string
  pictureWidth: string
}

export const NoItemsPlug: FC<NoItemsPlugProps> = ({
  text,
  pictureHeight,
  pictureWidth,
}) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >
    <Box
      component="img"
      sx={{ height: pictureHeight, width: pictureWidth, display: 'block' }}
      alt="The crying cactus."
      src={require('../../assets/images/cryingCactus.png')}
    />
    <Typography
      sx={{ ...productStyles.customBoldFont, ...{ display: 'block' } }}
    >
      {text}
    </Typography>
  </Box>
)
