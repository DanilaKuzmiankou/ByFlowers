import {Checkbox, FormControlLabel, FormGroup, TextField, Typography} from '@mui/material';
import './Plants.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getProducts} from "../../api/store/Product";
import {checkForOne, getCheckedItems} from "../../utils/Utilst";
import {productStyles} from "../../themes";

interface LocationState {
    productType: string
}


export const Plants = () => {

    const plants = ['Сactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']

    const location = useLocation();

    const { productType } = location.state as LocationState;

    const [plantsChecked, setPlantsChecked] = useState<boolean[]>([]);
    const [plantChecked, setPlantChecked] = useState<boolean[]>([false, false]);

    useEffect(() => {

        initCheckboxes()
    }, [])


    useEffect(() => {
        const checkedPlants = getCheckedItems(plantsChecked, plants)
        async function fetchData() {
            let result = await getProducts(checkedPlants)
            console.log(result)
        }
        fetchData()
    }, [plantsChecked])


    const initCheckboxes = () => {
        const plantsCheckboxes = plants.map((element) => {
            if(element === productType){
                setPlantChecked([false, true])
                return true
            }
            return false
        })
        setPlantsChecked(plantsCheckboxes)
    }

    const handPlantsChange = (event: ChangeEvent<HTMLInputElement>, checkedIndex:number):void => {
        const newChecked = [...plantsChecked]
        newChecked[checkedIndex] = event.target.checked
        setPlantsChecked(newChecked);
        const allSame = checkForOne(newChecked)
        setPlantChecked([allSame && !newChecked.includes(false), !allSame])
    }

    const handlePlantChange = (event: ChangeEvent<HTMLInputElement>):void => {
        const newChecked = [...plantsChecked].map(() => event.target.checked)
        setPlantsChecked(newChecked);
        setPlantChecked([event.target.checked, false])
    }

    return (
        <>
          <div className='filters-container'>
              <Typography sx={{...productStyles.customBoldFont, ...productStyles.filtersTypography}} >
                  Price
              </Typography>
              <TextField className="filters-input" size='small' type='number' label="from" variant="outlined" />
              <TextField className="filters-input" size='small' type='number' label="to" variant="outlined" />
              <Typography sx={{...productStyles.customBoldFont, ...productStyles.filtersTypography}} >
              Type
              </Typography>
                  label={<Typography sx={productStyles.customNormalFont}>Plants</Typography>}
                  control={
                      <Checkbox
                          checked={plantChecked[0]}
                          indeterminate={plantChecked[1]}
                          onChange={handlePlantChange}
                      />
                  }

              <FormGroup>
                  {plants.map((plant, index) => (
                      <FormControlLabel
                          key={index}
                          sx={productStyles.checkboxGroup}
                          control={
                              <Checkbox
                                  checked={plantsChecked[index] || false}
                                  onChange={(event) => handPlantsChange(event, index)}
                              />}
                          label={<Typography sx={productStyles.customNormalFont}>{plant}</Typography>}
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

