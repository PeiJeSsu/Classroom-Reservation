import React from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
export default function Combo_box({
    options=[],
    label="選擇選項",
    multiple=false,
    value,
    onChange,
    getOptionLabel= (option) =>option.label,
    isOptionEqualToValue =(option , value)=>option.value === value?.value,
    sx={},
    }){
    return (
        <Box sx={sx}>
        <Autocomplete
            options={options}
            multiple ={multiple}
            value={value}
            onChange={onChange}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
        </Box>
    );
}