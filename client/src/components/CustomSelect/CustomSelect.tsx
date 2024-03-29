import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { useState } from 'react'
import productsStore from '../../store/ProductsStore'
import { productStyles } from '../../themes'

export const CustomSelect = () => {
  const filterOptions = [
    'Цене, сначала дешевые',
    'Цене, сначала дорогие',
    'Дате, сначала новые',
  ]
  const [filterOption, setFilterOption] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value
    let sortOptions: string[] = []
    setFilterOption(selected)
    switch (selected) {
      case filterOptions[0]:
        sortOptions = ['price', 'ASC']
        break
      case filterOptions[1]:
        sortOptions = ['price', 'DESC']
        break
      case filterOptions[2]:
        sortOptions = ['updatedAt', 'DESC']
        break
      default:
        break
    }
    productsStore.setSortOptions(sortOptions)
  }

  return (
    <Select
      value={filterOption}
      onChange={handleChange}
      autoWidth
      color="success"
      variant="outlined"
      sx={{
        minHeight: '25px',
        height: { xs: '55px', sm: '35px' },
        width: { xs: '95px', sm: 'initial' },
      }}
    >
      {filterOptions.map((option, index) => (
        <MenuItem key={index} value={option}>
          <Typography sx={productStyles.customSmallFont}>{option}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
