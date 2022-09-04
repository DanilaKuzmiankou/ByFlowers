import React, { useImperativeHandle, useState } from 'react'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { productStyles } from '../../themes'
import { CountInputProps } from '../../models/IProduct'

const counterButtonsStyle = {
  fontSize: '2.5rem',
  justifyContent: 'center',
  display: 'flex',
  maxHeight: '35px',
  maxWidth: '35px',
  minWidth: '25px',
}

interface ProductCounterInputProps {
  startCount?: number
  setItemCount?: (count: number) => void
  totalCount: number
  minCount?: number
}

export const ProductCounterInput = React.forwardRef<
  CountInputProps,
  ProductCounterInputProps
>(({ totalCount, startCount = 1, setItemCount, minCount = 1 }, _ref) => {
  const [count, setCount] = useState<number>(startCount)

  useImperativeHandle(_ref, () => ({
    counterGetCount: () => count,
    counterSetCount: (itemsCount: number) => {
      setCount(itemsCount)
    },
  }))

  const updateCount = (itemsCount: number) => {
    if (setItemCount) {
      setItemCount(itemsCount)
    }
    setCount(itemsCount)
  }

  const setNewCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentCount = Number(event.target.value)
    if (!Number.isNaN(currentCount)) {
      if (currentCount < minCount) updateCount(minCount)
      else if (currentCount > totalCount) updateCount(totalCount)
      else updateCount(currentCount)
    }
  }

  const increaseCount = () => {
    if (count < totalCount) updateCount(count + 1)
  }

  const decreaseCount = () => {
    if (count > minCount) updateCount(count - 1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '15px 0',
      }}
    >
      <Button color="success" sx={counterButtonsStyle} onClick={decreaseCount}>
        -
      </Button>
      <TextField
        color="success"
        sx={{
          ...productStyles.customNormalFont,
          ...{
            display: 'inline-block',
            marginLeft: '8px',
            marginRight: '8px',
          },
        }}
        inputProps={{
          style: {
            textAlign: 'center',
            fontSize: '1.2rem',
            height: '5px',
            maxHeight: '5px',
            minHeight: '5px',
          },
        }}
        value={count}
        onChange={setNewCount}
      />
      <Button color="success" sx={counterButtonsStyle} onClick={increaseCount}>
        +
      </Button>
    </Box>
  )
})
