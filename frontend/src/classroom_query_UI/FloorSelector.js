import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

export default function FloorSelector({floor, setFloor}) {
    const handleChange = (event) => {
        setFloor(event.target.value);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{minWidth: 150}}>
            <InputLabel id="floor-label">樓層</InputLabel>
            <Select
                labelId="floor-label"
                value={floor}
                onChange={handleChange}
                label="樓層"
            >
                <MenuItem value="B1">B1</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
            </Select>
        </FormControl>
    );
}
