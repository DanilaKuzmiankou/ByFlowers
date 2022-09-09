import { FC, MouseEventHandler, useMemo } from 'react'
import { IconContext } from 'react-icons'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import IconButton from '@mui/material/IconButton'

interface ExpandButtonProps {
  isTabOpen: boolean
  setIsTabOpen: Function
}
export const ExpandButton: FC<ExpandButtonProps> = ({
  isTabOpen,
  setIsTabOpen,
}) => {
  const handleTabClick = () => {
    setIsTabOpen(!isTabOpen)
  }

  const arrowUpIconPropsMemoized = useMemo(
    () => ({ color: '#FF0054', size: '43' }),
    [],
  )
  const arrowDownIconPropsMemoized = useMemo(() => ({ size: '43' }), [])
  return (
    <IconButton sx={{ marginLeft: 'auto', p: 0 }} onClick={handleTabClick}>
      <IconContext.Provider
        value={
          isTabOpen ? arrowUpIconPropsMemoized : arrowDownIconPropsMemoized
        }
      >
        {isTabOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </IconContext.Provider>
    </IconButton>
  )
}
