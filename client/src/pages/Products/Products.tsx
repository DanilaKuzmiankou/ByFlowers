import {Checkbox, FormControlLabel, FormGroup, TextField, Typography} from '@mui/material';
import './Products.css'
import {ChangeEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

interface LocationState {
    productType: string
}


export const Products = () => {

    const flowers = ['Anutina eyes', 'Orchidea', 'Roses', 'Lilies']
    const plants = ['Сactus', 'Begonia', 'Paddle Plant', 'Lady Palm', 'Peperomia', 'Pothos', 'Agloenema Chinese Evergreen', 'Mini Jade Plant', 'Asparagus Fern']

    const styles = {
         customBoldFont: {
             fontFamily: 'Avenir, sans-serif',
             fontSize: '0.94rem',
             fontWeight: '600 !important',
             letterSpacing: '0 !important',
         },
        customNormalFont: {
            fontFamily: 'Avenir, sans-serif',
            fontSize: '0.94rem',
            fontWeight: '0 !important',
            letterSpacing: '0 !important',
        },
         filtersTypography: {
            margin: '5px 0'
        },
        checkboxGroup: {
             marginLeft: '10px'
        }

    }
    const location = useLocation();

    const { productType } = location.state as LocationState;


    const [flowersChecked, setFlowersChecked] = useState<boolean[]>([]);
    const [flowerChecked, setFlowerChecked] = useState<boolean[]>([false, false]);
    const [plantsChecked, setPlantsChecked] = useState<boolean[]>([]);
    const [plantChecked, setPlantChecked] = useState<boolean[]>([false, false]);

    useEffect(() => {
        initCheckboxes()
    }, [])

    useEffect(() => {
        const checkedFlowers = getCheckedItems(flowersChecked, flowers)
        console.log('checked: ', checkedFlowers)
    }, [flowersChecked])

    useEffect(() => {
        const checkedPlants = getCheckedItems(plantsChecked, plants)
        console.log('checked plants: ', checkedPlants)
    }, [plantsChecked])

    const getCheckedItems = (checkedItems:boolean[], itemsNames:string[]):string[] => {
        const checkedItemsIndexes = checkedItems.map((item, index) => {
            if(item) return index
            return -1
        })
        let resultArr = checkedItemsIndexes.map(i => itemsNames[i])
        return resultArr.filter(element => element !== undefined)
    }

    const initCheckboxes = () => {
        const plantsCheckboxes = plants.map((element) => {
            if(element === productType){
                setPlantChecked([false, true])
                return true
            }
            return false
        })
        const flowersCheckboxes = flowers.map((element) => {
            if(element === productType){
                setFlowerChecked([false, true])
                return true
            }
            return false
        })
        setFlowersChecked(flowersCheckboxes)
        setPlantsChecked(plantsCheckboxes)
    }

    const checkForOne = (array: boolean[]):boolean => (new Set(array)).size === 1

    const handleFlowersChange = (event: ChangeEvent<HTMLInputElement>, checkedIndex:number):void => {
        const newChecked = [...flowersChecked]
        newChecked[checkedIndex] = event.target.checked
        setFlowersChecked(newChecked);
        const allSame = checkForOne(newChecked)
        setFlowerChecked([allSame && !newChecked.includes(false), !allSame])
    }

    const handleFlowerChange = (event: ChangeEvent<HTMLInputElement>):void => {
        const newChecked = [...flowersChecked].map(() => event.target.checked)
        setFlowersChecked(newChecked);
        setFlowerChecked([event.target.checked, false])
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
              <Typography sx={{...styles.customBoldFont, ...styles.filtersTypography}} >
                  Price
              </Typography>
              <TextField className="filters-input" size='small' type='number' label="from" variant="outlined" />
              <TextField className="filters-input" size='small' type='number' label="to" variant="outlined" />
              <Typography sx={{...styles.customBoldFont, ...styles.filtersTypography}} >
              Type
              </Typography>
              <FormControlLabel
                  label={<Typography sx={styles.customNormalFont} >Flowers</Typography>}
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
                          sx={styles.checkboxGroup}
                          control={
                          <Checkbox
                              checked={flowersChecked[index] || false}
                              onChange={(event) => handleFlowersChange(event, index)}
                          />}
                          label={<Typography sx={styles.customNormalFont}>{flower}</Typography>}
                      />
                  ))}
              </FormGroup>
              <FormControlLabel
                  label={<Typography sx={styles.customNormalFont}>Plants</Typography>}
                  control={
                      <Checkbox
                          checked={plantChecked[0]}
                          indeterminate={plantChecked[1]}
                          onChange={handlePlantChange}
                      />
                  }
              />
              <FormGroup>
                  {plants.map((plant, index) => (
                      <FormControlLabel
                          key={index}
                          sx={styles.checkboxGroup}
                          control={
                              <Checkbox
                                  checked={plantsChecked[index] || false}
                                  onChange={(event) => handPlantsChange(event, index)}
                              />}
                          label={<Typography sx={styles.customNormalFont}>{plant}</Typography>}
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

