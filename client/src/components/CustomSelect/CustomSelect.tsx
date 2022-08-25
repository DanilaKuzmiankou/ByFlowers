import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useEffect, useState} from "react";
import productsStore from "../../store/ProductsStore";


export const CustomSelect = () => {

    const filterOptions = ['Default', 'Price low to high', 'Price high to low', 'Bestseller']
    const [filterOption, setFilterOption] = useState<string>(filterOptions[0])

    const handleChange = (event: SelectChangeEvent) => {
        const selected = event.target.value
        let sortOptions:string[] = []
        setFilterOption(selected);
        switch (selected) {
            case filterOptions[1]:
                sortOptions = ['price', 'ASC']
                break;
            case filterOptions[2]:
                sortOptions = ['price', 'DESC']
                break;
            default: break ;
        }
        productsStore.setSortOptions(sortOptions)
    };

    return (
        <Select
            value={filterOption}
            onChange={handleChange}
            autoWidth
            color='success'
            variant="outlined"
            sx={{ minHeight: '25px', height: '35px' }}
        >
            {filterOptions.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
        </Select>
    );
};

