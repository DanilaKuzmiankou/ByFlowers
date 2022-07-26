import {Checkbox, FormControlLabel, FormGroup, TextField, Typography} from '@mui/material';
import './ProductsFilter.css'
import {ChangeEvent, FC, useEffect, useState} from "react";
import {checkForOne, getCheckedItems} from "../../utils/Utilst";
import {productStyles} from "../../themes";
import {getProducts} from "../../api/store/Product";

interface ProductsProps {
    products: string[],
    productType: string,
    mainCheckboxName: string
}


export const ProductsFilter: FC<ProductsProps> = ({
                                                      products, productType, mainCheckboxName
                                                  }) => {

    const [subCheckboxes, setSubCheckboxes] = useState<boolean[]>([]);
    const [mainCheckbox, setMainCheckbox] = useState<boolean[]>([false, false]);

    useEffect(() => {
        initCheckboxes()
    }, [])


    useEffect(() => {
        const checkedPlants = getCheckedItems(subCheckboxes, products)
        async function fetchData() {
            let result = await getProducts(checkedPlants)
            console.log(result)
        }
        fetchData()
    }, [subCheckboxes])

    const initCheckboxes = () => {
        const productsCheckboxes = products.map((element) => {
            if (element === productType) {
                setMainCheckbox([false, true])
                return true
            }
            return false
        })
        setSubCheckboxes(productsCheckboxes)
    }

    const handleSubCheckboxes = (event: ChangeEvent<HTMLInputElement>, checkedIndex: number): void => {
        const newChecked = [...subCheckboxes]
        newChecked[checkedIndex] = event.target.checked
        setSubCheckboxes(newChecked);
        const allSame = checkForOne(newChecked)
        setMainCheckbox([allSame && !newChecked.includes(false), !allSame])
    }

    const handleMainCheckbox = (event: ChangeEvent<HTMLInputElement>): void => {
        const newChecked = [...subCheckboxes].map(() => event.target.checked)
        setSubCheckboxes(newChecked);
        setMainCheckbox([event.target.checked, false])
    }

    return (
        <>
            <div className='filters-container'>
                <Typography sx={{...productStyles.customBoldFont, ...productStyles.filtersTypography}}>
                    Price
                </Typography>
                <TextField className="filters-input" size='small' type='number' label="from" variant="outlined"/>
                <TextField className="filters-input" size='small' type='number' label="to" variant="outlined"/>
                <Typography sx={{...productStyles.customBoldFont, ...productStyles.filtersTypography}}>
                    Type
                </Typography>
                <FormControlLabel
                    label={<Typography sx={productStyles.customNormalFont}>{mainCheckboxName}</Typography>}
                    control={
                        <Checkbox
                            checked={mainCheckbox[0]}
                            indeterminate={mainCheckbox[1]}
                            onChange={handleMainCheckbox}
                        />
                    }
                />
                <FormGroup>
                    {products.map((product, index) => (
                        <FormControlLabel
                            key={index}
                            sx={productStyles.checkboxGroup}
                            control={
                                <Checkbox
                                    checked={subCheckboxes[index] || false}
                                    onChange={(event) => handleSubCheckboxes(event, index)}
                                />}
                            label={<Typography sx={productStyles.customNormalFont}>{product}</Typography>}
                        />
                    ))}
                </FormGroup>
            </div>
        </>
    );
};

