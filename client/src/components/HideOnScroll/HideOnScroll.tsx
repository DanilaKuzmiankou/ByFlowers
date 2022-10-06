import { Slide, useScrollTrigger } from '@mui/material'
import { ReactElement } from 'react'

interface Props {
  window?: () => Window
  children: ReactElement
}

export const HideOnScroll = (props: Props) => {
  const { children, window } = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
