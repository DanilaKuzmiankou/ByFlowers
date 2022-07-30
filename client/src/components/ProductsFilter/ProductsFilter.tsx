import {Checkbox, FormControlLabel, FormGroup, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import './ProductsFilter.css'
import {ChangeEvent, FC, useEffect, useState} from "react";
import {checkForOne, getCheckedItems} from "../../utils/Utils";
import {productStyles} from "../../themes";
import {observer} from "mobx-react-lite";
import productsStore from "../../store/ProductsStore";
import CircleChecked from '@mui/icons-material//CheckCircleOutline';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';

export interface ProductsProps {
    productsList: string[],
    mainCheckboxName: string
}


export const ProductsFilter = observer<ProductsProps>(({
                                                           productsList, mainCheckboxName
                                                       }) => {

    const theme = useTheme();
    const greaterThanXXL = useMediaQuery(theme.breakpoints.up("xxl"));
    const greaterThanXL = useMediaQuery(theme.breakpoints.up("xl"));



    const [subCheckboxes, setSubCheckboxes] = useState<boolean[]>([]);
    const [mainCheckbox, setMainCheckbox] = useState<boolean[]>([false, false]);



    useEffect(() => {
        return function cleanup() {
            productsStore.setProducts([])
            productsStore.setSelectedProductsName('')
        };
    }, [])

    useEffect(() => {
        initCheckboxes()
    }, [productsStore.selectedNavbarProduct])


    const initCheckboxes = () => {
        let productsCheckboxes:boolean[]
        if (productsStore.selectedNavbarProduct) {
            productsCheckboxes = productsList.map((element) => {
                if (element === productsStore.selectedNavbarProduct) {
                    setMainCheckbox([false, true])
                    return true
                }
                return false
            })
        }
        else {
            productsCheckboxes = productsList.map(() => true)
            setMainCheckbox([true, false])
        }
        setSubCheckboxes(productsCheckboxes)
        updateProducts(productsCheckboxes)
    }

    const handleSubCheckboxes = (event: ChangeEvent<HTMLInputElement>, checkedIndex: number) => {
        const newChecked = [...subCheckboxes]
        newChecked[checkedIndex] = event.target.checked
        setSubCheckboxes(newChecked);
        const allSame = checkForOne(newChecked)
        setMainCheckbox([allSame && !newChecked.includes(false), !allSame])
        updateProducts(newChecked)
    }

    const updateProducts = async (newChecked: boolean[]) => {
        const checkedPlants = getCheckedItems(newChecked, productsList, productsStore.selectedProductsName.split(', '))
        if (checkedPlants) {
            await productsStore.fetchNewProducts(checkedPlants)
            checkedPlants.length > 3 ?
                productsStore.setSelectedProductsName(checkedPlants.slice(0, 3).join(', ') + '...') :
                productsStore.setSelectedProductsName(checkedPlants.join(', '))
        }
    }

    const handleMainCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const newChecked = [...subCheckboxes].map(() => event.target.checked)
        setSubCheckboxes(newChecked);
        setMainCheckbox([event.target.checked, false])
        updateProducts(newChecked)

    }

    const updateProductsPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = Number(event.target.value)
        event.target.id === 'minPrice'
            ?
            productsStore.setMinProductPrice(price)
            :
            productsStore.setMaxProductPrice(price)
        updateProducts(subCheckboxes)
    }

    const calcInputFontSize = ():string => {
        if(greaterThanXXL) return '2.3rem'
        if(greaterThanXL) return '1.6rem'
        return '1.3rem'
    }

    const calcPlaceHolderFontSize = ():string => {
        if(greaterThanXXL) return '2.2rem'
        if(greaterThanXL) return '1.6rem'

        return '1.3rem'
    }

    return (
        <>
            <div>
                <Typography sx={{...productStyles.customBoldFont, ...productStyles.filtersHeaderTypography}}>
                    Price
                </Typography>
                <div className='filters-inputs-container'>
                    <TextField
                        id='minPrice'
                        className="filters-input"
                        sx={{
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                borderRadius: '7% 0 0 7%'
                            }
                        }}
                        size={greaterThanXXL ? 'medium' : 'small'}
                        inputProps={{style: {fontSize: calcInputFontSize()}}} // font size of input text
                        InputLabelProps={{style: {fontSize: calcPlaceHolderFontSize()}}} // font size of input label
                        type='number'
                        label="from"
                        variant="outlined"
                        onChange={updateProductsPrice}
                    />
                    <TextField
                        id='maxPrice'
                        className="filters-input"
                        sx={{
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                borderRadius: '0 7% 7% 0'
                            }
                        }}
                        size={greaterThanXXL ? 'medium' : 'small'}
                        inputProps={{style: {fontSize: calcInputFontSize(), borderColor: "red"}}} // font size of input text
                        InputLabelProps={{style: {fontSize: calcPlaceHolderFontSize()}}} // font size of input label
                        type='number'
                        label="to"
                        variant="outlined"
                        onChange={updateProductsPrice}/>
                </div>
                <Typography sx={{...productStyles.customBoldFont, ...productStyles.filtersHeaderTypography}}>
                    Type
                </Typography>
                <FormControlLabel
                    label={<Typography sx={productStyles.customNormalFont}>{mainCheckboxName}</Typography>}
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
                    {productsList.map((product, index) => (
                        <FormControlLabel
                            key={index}
                            sx={productStyles.checkboxGroup}
                            control={
                                <Checkbox
                                    checked={subCheckboxes[index] || false}
                                    onChange={(event) => handleSubCheckboxes(event, index)}
                                    color="success"
                                />}
                            label={<Typography sx={productStyles.customNormalFont}>{product}</Typography>}
                        />
                    ))}
                </FormGroup>
            </div>
        </>
    );
})

