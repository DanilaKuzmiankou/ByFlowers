import { CSSProperties, useState } from 'react'
import { buyButtonDefaultStyle, buyButtonHoverStyle } from '../themes'

export default function useHoverStyle() {
  const [buttonStyle, setButtonStyle] = useState<CSSProperties>(
    buyButtonDefaultStyle,
  )

  const buyButtonOverElementsStyle = {
    position: 'absolute',
    width: 'calc(100% - 40px)',
    bottom: '10px',
    left: '20px',
    right: '20px',
  } as CSSProperties

  const onItemHover = () => {
    setButtonStyle({ ...buyButtonHoverStyle, ...buyButtonOverElementsStyle })
  }

  const onItemNotHover = () => {
    setButtonStyle({ ...buyButtonDefaultStyle, ...buyButtonOverElementsStyle })
  }

  return { buttonStyle, onItemHover, onItemNotHover }
}
