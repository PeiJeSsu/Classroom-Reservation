import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

export default function FloorSelector({ floor, setFloor, setSearchQuery  }) {
    const [floors, setFloors] = useState([]);

    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/classroom_build/floor');
                setFloors(response.data);
            } catch (error) {
                console.error('Error fetching floors:', error);
            }
        };

        fetchFloors();
    }, [setFloor]);

    const handleChange = (event) => {
        setFloor(event.target.value);
        setSearchQuery('');
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="floor-label">樓層</InputLabel>
            <Select
                labelId="floor-label"
                value={floor}
                onChange={handleChange}
                label="樓層"
            >
                <MenuItem value="">全部</MenuItem>
                {floors.map((floorOption, index) => (
                    <MenuItem key={index} value={floorOption}>
                        {floorOption}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
