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
import { ChangeEvent, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { productStyles } from '../../themes'
import productsStore from '../../store/ProductsStore'

export interface ProductsProps {
  mainCheckboxName: string
}

export const ProductsFilter = observer<ProductsProps>(
  ({ mainCheckboxName }) => {
    const theme = useTheme()
    const greaterThanXXXL = useMediaQuery(theme.breakpoints.up('xxxl'))
    const greaterThanXL = useMediaQuery(theme.breakpoints.up('xl'))

    const [checkedProducts, setCheckedProducts] = useState<string[]>([])
    const [mainCheckbox, setMainCheckbox] = useState<boolean[]>([false, false])

    const [currentMinPrice, setCurrentMinPrice] = useState<number | null>(null)
    const [currentMaxPrice, setCurrentMaxPrice] = useState<number | null>(null)

    const [productsCategories, setProductsCategories] = useState<string[]>([])

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

    const validateInput = (event: ChangeEvent<HTMLInputElement>): number => {
      const mathSymbols = ['+', '-', '*', '/']
      const rawValue = event.target.value
      if (!mathSymbols.includes(rawValue)) {
        const value = Number(rawValue)
        if (value > 0) return value
        return 0
      }
      return -1
    }

    const updateMinPrice = (event: ChangeEvent<HTMLInputElement>) => {
      const price = validateInput(event)
      if (price !== -1) {
        productsStore.setMinProductPrice(price)
        setCurrentMinPrice(price !== 0 ? price : null)
      }
    }

    const updateMaxPrice = (event: ChangeEvent<HTMLInputElement>) => {
      const price = validateInput(event)
      if (price !== -1) {
        productsStore.setMaxProductPrice(price)
        setCurrentMaxPrice(price !== 0 ? price : null)
      }
    }

    const updateProducts = async (newProducts: string[]) => {
      productsStore.setProductsNames(newProducts)
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

    const initCheckboxes = () => {
      if (productsStore.selectedNavbarProduct) {
        setCheckedProducts([productsStore.selectedNavbarProduct])
        setMainCheckbox([false, true])
      } else {
        setCheckedProducts(productsCategories)
        setMainCheckbox([true, false])
      }
    }

    const handleSubCheckboxes = (
      event: ChangeEvent<HTMLInputElement>,
      product: string,
    ) => {
      if (event.target.checked) {
        const newCheckedProducts = [...checkedProducts, product]
        setCheckedProducts(newCheckedProducts)
        const allCheckboxesAreChecked =
          newCheckedProducts.length === productsCategories.length
        setMainCheckbox([allCheckboxesAreChecked, !allCheckboxesAreChecked])
      } else {
        const newCheckedProducts = checkedProducts.filter(
          (pr) => pr !== product,
        )
        setCheckedProducts(newCheckedProducts)
        setMainCheckbox([
          !(newCheckedProducts.length === 0),
          !(newCheckedProducts.length === 0),
        ])
      }
    }

    const handleMainCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCheckedProducts([...productsCategories])
      } else {
        setCheckedProducts([])
      }
      setMainCheckbox([event.target.checked, false])
    }

    useEffect(() => {
      if (productsCategories?.length === 0 && checkedProducts?.length === 0) {
        setProductsCategories(productsStore.plants)
        setCheckedProducts(productsStore.plants)
        initCheckboxes()
      }
    }, [productsStore.plants])

    useEffect(() => {
      updateProducts(checkedProducts)
    }, [checkedProducts])

    useEffect(
      () =>
        function cleanup() {
          productsStore.setProducts([])
          productsStore.setSelectedProductsName('')
        },
      [],
    )

    useEffect(() => {
      if (productsCategories) {
        initCheckboxes()
      }
    }, [productsCategories])

    useEffect(() => {
      if (
        productsCategories ===
        (productsStore.isFlowers ? productsStore.flowers : productsStore.plants)
      ) {
        initCheckboxes()
      } else {
        setProductsCategories(
          productsStore.isFlowers
            ? productsStore.flowers
            : productsStore.plants,
        )
      }
    }, [productsStore.selectedNavbarProduct, productsStore.isFlowers])

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
            }}
            size={greaterThanXXXL ? 'medium' : 'small'}
            inputProps={{ style: { fontSize: calcInputFontSize() } }} // font size of input text
            InputLabelProps={{ style: { fontSize: calcPlaceHolderFontSize() } }} // font size of input label
            type="number"
            label="от"
            variant="outlined"
            color="success"
            value={currentMinPrice ?? ''}
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
            }}
            size={greaterThanXXXL ? 'medium' : 'small'}
            inputProps={{
              style: { fontSize: calcInputFontSize(), borderColor: 'red' },
            }}
            InputLabelProps={{ style: { fontSize: calcPlaceHolderFontSize() } }}
            type="number"
            label="до"
            variant="outlined"
            color="success"
            value={currentMaxPrice ?? ''}
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
              checked={mainCheckbox[0]}
              indeterminate={mainCheckbox[1]}
              onChange={handleMainCheckbox}
              color="success"
            />
          }
        />
        <FormGroup>
          {productsCategories.map((product, index) => (
            <FormControlLabel
              key={index}
              sx={productStyles.checkboxGroup}
              control={
                <Checkbox
                  checked={checkedProducts.includes(product)}
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
