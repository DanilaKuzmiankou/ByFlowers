import {Checkbox, FormControlLabel, FormGroup, TextField, Typography} from '@mui/material';
import './Flowers.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getProducts} from "../../api/store/Product";
import {checkForOne, getCheckedItems} from "../../utils/Utilst";
import {productStyles} from "../../themes";

interface LocationState {
    productType: string
}


export const Flowers = () => {

    const flowers = ['Anutina eyes', 'Orchidea', 'Roses', 'Lilies']

    const location = useLocation();

    const {productType} = location.state as LocationState;


    const [flowersChecked, setFlowersChecked] = useState<boolean[]>([]);
    const [flowerChecked, setFlowerChecked] = useState<boolean[]>([false, false]);

    useEffect(() => {
        initCheckboxes()
    }, [])

    useEffect(() => {
        const checkedFlowers = getCheckedItems(flowersChecked, flowers)

        async function fetchData() {
            let result = await getProducts(checkedFlowers)
            console.log(result)
        }

        fetchData()
    }, [flowersChecked])


    const initCheckboxes = () => {
        const flowersCheckboxes = flowers.map((element) => {
            if (element === productType) {
                setFlowerChecked([false, true])
                return true
            }
            return false
        })
        setFlowersChecked(flowersCheckboxes)
    }


    const handleFlowersChange = (event: ChangeEvent<HTMLInputElement>, checkedIndex: number): void => {
        const newChecked = [...flowersChecked]
        newChecked[checkedIndex] = event.target.checked
        setFlowersChecked(newChecked);
        const allSame = checkForOne(newChecked)
        setFlowerChecked([allSame && !newChecked.includes(false), !allSame])
    }

    const handleFlowerChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newChecked = [...flowersChecked].map(() => event.target.checked)
        setFlowersChecked(newChecked);
        setFlowerChecked([event.target.checked, false])
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
                    label={<Typography sx={productStyles.customNormalFont}>Flowers</Typography>}
                    control={
                        <Checkbox
                            checked={flowerChecked[0]}
                            indeterminate={flowerChecked[1]}
                            onChange={handleFlowerChange}
                        />
                    }
                />
                <FormGroup>
                    {flowers.map((flower, index) => (
                        <FormControlLabel
                            key={index}
                            sx={productStyles.checkboxGroup}
                            control={
                                <Checkbox
                                    checked={flowersChecked[index] || false}
                                    onChange={(event) => handleFlowersChange(event, index)}
                                />}
                            label={<Typography sx={productStyles.customNormalFont}>{flower}</Typography>}
                        />
                    ))}
                </FormGroup>

            </div>
            <div className='products-container'>
                Avenir
            </div>
        </>
    );
};

