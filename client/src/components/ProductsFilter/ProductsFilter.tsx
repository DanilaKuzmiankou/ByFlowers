import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import './ProductsFilter.css'
import { ChangeEvent, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { productStyles } from '../../themes'
import productsStore from '../../store/ProductsStore'
import { areArraysEquals } from '../../utils/Utils'

export interface ProductsProps {
  mainCheckboxName: string
}

export const ProductsFilter = observer<ProductsProps>(
  ({ mainCheckboxName }) => {
    const theme = useTheme()
    const greaterThanXXXL = useMediaQuery(theme.breakpoints.up('xxxl'))
    const greaterThanXL = useMediaQuery(theme.breakpoints.up('xl'))

    const calcInputFontSize = (): string => {
      if (greaterThanXXXL) return '2.3rem'
      if (greaterThanXL) return '1.6rem'
      return '1.3rem'
    }

    const calcPlaceHolderFontSize = (): string => {
      if (greaterThanXXXL) return '2.2rem'
      if (greaterThanXL) return '1.6rem'
      return '1.3rem'
    }

    const validateInput = (
      event: ChangeEvent<HTMLInputElement>,
    ): number | string => {
      const rawValue = event.target.value
      const value = Number(rawValue)
      return value >= 0 ? value : -1
    }

    const updateMinPrice = (event: ChangeEvent<HTMLInputElement>) => {
      const price = validateInput(event)
      if (price !== -1) {
        productsStore.setMinProductPrice(price !== 0 ? price : '')
      }
    }

    const updateMaxPrice = (event: ChangeEvent<HTMLInputElement>) => {
      const price = validateInput(event)
      if (price !== -1) {
        productsStore.setMaxProductPrice(price !== 0 ? price : '')
      }
    }

    const updateProducts = async (newProducts: string[]) => {
      if (!areArraysEquals(productsStore.productsNames, newProducts)) {
        productsStore.setProductsNames(newProducts)
        productsStore.fetchProducts(newProducts)
      }
      if (newProducts) {
        if (newProducts.length > 3) {
          productsStore.setSelectedProductsName(
            `${newProducts.slice(0, 3).join(', ')}...`,
          )
        } else {
          productsStore.setSelectedProductsName(newProducts.join(', '))
        }
      }
    }

    const initCheckboxes = (checked: string[]) => {
      productsStore.setMainCheckbox([false, true])
      updateProducts(checked)
    }

    const handleSubCheckboxes = (
      event: ChangeEvent<HTMLInputElement>,
      product: string,
    ) => {
      let newCheckedProducts: string[]
      if (event.target.checked) {
        newCheckedProducts = [...productsStore.checkedProducts, product]
        productsStore.setCheckedProducts(newCheckedProducts)
        const allCheckboxesAreChecked =
          newCheckedProducts.length === productsStore.productsCategories.length
        productsStore.setMainCheckbox([
          allCheckboxesAreChecked,
          !allCheckboxesAreChecked,
        ])
      } else {
        newCheckedProducts = productsStore.checkedProducts.filter(
          (pr) => pr !== product,
        )
        productsStore.setCheckedProducts(newCheckedProducts)
        productsStore.setMainCheckbox([
          !(newCheckedProducts.length === 0),
          !(newCheckedProducts.length === 0),
        ])
      }
      updateProducts(newCheckedProducts)
    }

    const handleMainCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
      const newProducts = event.target.checked
        ? productsStore.productsCategories
        : []
      productsStore.setCheckedProducts(newProducts)
      updateProducts(newProducts)
      productsStore.setMainCheckbox([event.target.checked, false])
    }

    useEffect(() => {
      if (
        productsStore.productsCategories?.length === 0 &&
        productsStore.checkedProducts?.length === 0
      ) {
        productsStore.setProductsCategories(productsStore.plants)
        productsStore.setCheckedProducts(productsStore.plants)
        initCheckboxes(productsStore.plants)
      }
    }, [productsStore.plants])

    useEffect(() => {
      return () => {}
    }, [])

    useEffect(() => {
      if (productsStore.isNavbarMenuWasToggled !== undefined) {
        initCheckboxes(productsStore.checkedProducts)
      }
    }, [productsStore.isNavbarMenuWasToggled])

    useEffect(() => {
      if (productsStore.sortOptions?.length > 0) {
        productsStore.fetchProducts()
      }
    }, [productsStore.sortOptions])

    return (
      <div>
        <Typography
          sx={{
            ...productStyles.customBoldFont,
            ...productStyles.filtersHeaderTypography,
          }}
        >
          Цена
        </Typography>
        <div className="filters-inputs-container">
          <TextField
            id="minPrice"
            className="filters-input"
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderRadius: '7px 0 0 7px',
              },
              '& .MuiOutlinedInput-input': {
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                },
              },
              '& .MuiInputBase-root': {
                backgroundColor: '#FFF',
                color: 'black',
              },
            }}
            size={greaterThanXXXL ? 'medium' : 'small'}
            inputProps={{ style: { fontSize: calcInputFontSize() } }} // font size of input text
            InputLabelProps={{ style: { fontSize: calcPlaceHolderFontSize() } }} // font size of input label
            label="от"
            variant="outlined"
            color="success"
            value={productsStore.minProductPrice}
            onChange={updateMinPrice}
          />
          <TextField
            id="maxPrice"
            className="filters-input"
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderRadius: '0 7px 7px 0',
              },
              '& .MuiOutlinedInput-input': {
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                },
              },
              '& .MuiInputBase-root': {
                backgroundColor: '#FFF',
                color: 'black',
              },
            }}
            size={greaterThanXXXL ? 'medium' : 'small'}
            inputProps={{
              style: { fontSize: calcInputFontSize(), borderColor: 'red' },
            }}
            InputLabelProps={{ style: { fontSize: calcPlaceHolderFontSize() } }}
            label="до"
            variant="outlined"
            color="success"
            value={productsStore.maxProductPrice}
            onChange={updateMaxPrice}
          />
        </div>
        <Typography
          sx={{
            ...productStyles.customBoldFont,
            ...productStyles.filtersHeaderTypography,
            ...{ marginTop: '15px' },
          }}
        >
          Категория
        </Typography>
        <FormControlLabel
          label={
            <Typography sx={productStyles.customNormalFont}>
              {mainCheckboxName}
            </Typography>
          }
          control={
            <Checkbox
              checked={productsStore.mainCheckbox[0]}
              indeterminate={productsStore.mainCheckbox[1]}
              onChange={handleMainCheckbox}
              color="success"
            />
          }
        />
        <FormGroup>
          {productsStore.productsCategories.map((product, index) => (
            <FormControlLabel
              key={index}
              sx={productStyles.checkboxGroup}
              control={
                <Checkbox
                  checked={productsStore.checkedProducts.includes(product)}
                  onChange={(event) => handleSubCheckboxes(event, product)}
                  color="success"
                />
              }
              label={
                <Typography sx={productStyles.customNormalFont}>
                  {product}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </div>
    )
  },
)
