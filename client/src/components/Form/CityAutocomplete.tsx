import {Autocomplete, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import React, {FC, SyntheticEvent, useImperativeHandle, useState} from "react";
import { RussianCity} from "../../models/GetRussianCitiesResponse";
import './Form.css'
import {faCity} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import {CityAutocompleteProps, CountInputProps} from "../../models/IProduct";

interface CityAutocomplete {
    cities: RussianCity[]
}

export const CityAutocomplete = React.forwardRef<CityAutocompleteProps, CityAutocomplete>(({cities}, _ref) => {

    const [isSelectTouched, setIsSelectTouched] = useState<boolean>(false)
    const [value, setValue] = useState<string|undefined>('')

    useImperativeHandle(_ref, () => ({
        getCity: () => {
            return value
        },
        setFieldIsRequired: () => {
            setIsSelectTouched(true)
        }
    }))

    return (
        <>
        <Autocomplete
            className="citySelect"
            onChange={(event: SyntheticEvent<Element, Event>, newValue: RussianCity | null) => {
                setValue(newValue?.name);
            }}
            onFocus={() => {
                setIsSelectTouched(false)
            }}
            onBlur={() => {
                setIsSelectTouched(true)
            }}
            sx={{
                mt: '10px',
        }}
            options={cities}
            autoHighlight
            getOptionLabel={(city) => city.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderOption={(props, city) => (
                <Box
                    component="li"
                    sx={{
                        fontFamily: 'inherit',
                        fontSize: '1.5rem'
                }}
                    {...props}>
                    {city.name}
                </Box>
            )}
            renderInput={(params) => (
                <div className={`${!value && isSelectTouched ? 'error-icon' : ''} citySelect-input-container`}>
                    <div className='citySelect-icon-container'>
                        <FontAwesomeIcon
                            className='icon'
                            width='40px'
                            icon={faCity}
                            color='#3A9AB9'
                        />
                    </div>
                <TextField
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                border: "1px solid #ced4da"
                            }
                        },

                        "& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                                border: "1px solid #ced4da"
                            }
                        },
                        "& .MuiOutlinedInput-root": {

                            "& > fieldset": {
                                border: '1px solid #ced4da',
                                borderRadius: '0 7px 7px 0'
                            }
                        }
                    }}
                    {...params}
                    inputProps={{
                        style: {
                            minHeight: 5,
                            height: 5,
                            fontFamily: 'Avenir, sans-serif',
                            fontSize: '1.5rem',
                        },
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
                </div>
            )}
        />
            <Typography sx={{
                color: '#FF6565',
                fontSize: '1.3rem',
                display: `${!value && isSelectTouched ? 'block' : 'none'}`
            }}>
                required
            </Typography>
        </>
    );
})