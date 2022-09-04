import * as React from 'react'
import { Slide, useScrollTrigger } from '@mui/material'

interface Props {
  window?: () => Window
  children: React.ReactElement
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
