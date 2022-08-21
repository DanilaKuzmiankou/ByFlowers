import React, {useImperativeHandle, useState} from 'react';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {productStyles} from "../../themes";
import Box from "@mui/material/Box";
import {CountInputProps} from "../../models/IProduct";

const counterButtonsStyle = {
    padding: 0,
    fontSize: '2.5rem',
    display: 'block',
    maxHeight: '35px',
    maxWidth: '35px',
    minWidth: '10px',
}

interface ProductCounterInputProps {
    startCount?: number,
    setItemCount?: (count: number) => void,
    totalCount: number,
}

export const ProductCounterInput = React.forwardRef<CountInputProps, ProductCounterInputProps>(({totalCount, startCount= 1, setItemCount}, _ref) => {

    const [count, setCount] = useState<number>(startCount)

    useImperativeHandle(_ref, () => ({
        counterGetCount: () => {
            return count
        },
        counterSetCount: (count: number) => {
            setCount(count)
        }
    }))

    const setNewCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentCount = Number(event.target.value)
        if (!isNaN(currentCount)) {
            if (currentCount === 0) updateCount(1)
            else if (currentCount > totalCount) updateCount(totalCount)
            else updateCount(currentCount)
        }
    }

    const updateCount = (count: number) => {
        if(setItemCount) {
            setItemCount(count)
        }
        setCount(count)
    }

    const increaseCount = () => {
        if (count < totalCount) updateCount(count + 1)
    }

    const decreaseCount = () => {
        if (count > 1) updateCount(count - 1)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '15px 0',
        }}>
            <Button
                color="success"
                sx={counterButtonsStyle}
                onClick={decreaseCount}
            >
                -
            </Button>
            <TextField
                color="success"
                sx={{...productStyles.customNormalFont, ...{display: 'inline-block', marginLeft: '8px', marginRight: '8px'}}}
                inputProps={{style: {textAlign: 'center', fontSize: '1.2rem' , height: '5px', maxHeight: '5px', minHeight: '5px'}}}
                value={count}
                onChange={setNewCount}
            />
            <Button
                color="success"
                sx={counterButtonsStyle}
                onClick={increaseCount}
            >
                +
            </Button>
        </Box>
    );
});

