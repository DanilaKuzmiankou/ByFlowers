import { Dialog, DialogContent } from '@mui/material'
import { observer } from 'mobx-react-lite'
import Box from '@mui/material/Box'
import { Login } from './Login/Login'
import userStore from '../../store/UserStore'
import { Signin } from './Signin/SignIn'
import { CloseButton } from '../CloseButton/CloseButton'

export const AuthDialog = observer(() => {
  const handleClose = () => {
    userStore.setIsAuthDialogOpen(false)
  }

  return (
    <Dialog
      fullWidth={false}
      maxWidth="xs"
      keepMounted
      open={userStore.isAuthDialogOpen}
      onClose={handleClose}
    >
      <DialogContent
        sx={{
          backgroundColor: '#d2e4fd',
          padding: {
            xs: '7px 9px',
            sm: '10px 16px',
          },
          position: 'relative',
          overflow: 'clip',
        }}
      >
        <Box sx={{ position: 'absolute', top: '-3px', right: '-3px' }}>
          <CloseButton closeFunction={handleClose} />
        </Box>
        {userStore.isLoginPageOpen ? <Login /> : <Signin />}
      </DialogContent>
    </Dialog>
  )
})
