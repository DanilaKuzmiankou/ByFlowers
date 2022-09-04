import Box from '@mui/material/Box'

export const NotFound = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${require('../../assets/images/error404Background.jpg')})`,
        minHeight: '100vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}
