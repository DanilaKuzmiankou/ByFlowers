import React, { FC, MouseEventHandler, useMemo } from 'react'
import IconButton from '@mui/material/IconButton'
import { IconContext } from 'react-icons'
import { GrClose } from 'react-icons/gr'

interface CloseButtonProps {
  closeFunction: MouseEventHandler<HTMLElement>
}

export const CloseButton: FC<CloseButtonProps> = ({ closeFunction }) => {
  const iconPropsMemoized = useMemo(() => ({ color: 'black', size: '18' }), [])

  return (
    <IconButton
      sx={{ marginLeft: 'auto' }}
      onClick={closeFunction}
      aria-label="close"
    >
      <IconContext.Provider value={iconPropsMemoized}>
        <GrClose />
      </IconContext.Provider>
    </IconButton>
  )
}
