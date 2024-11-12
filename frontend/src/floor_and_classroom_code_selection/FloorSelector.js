import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function FloorSelector({ floor, setFloor, setClassroomCode }) {
    const [floors, setFloors] = useState([]);

    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const response = await fetch('http://localhost:8080/classroom_build/floors');
                const data = await response.json();
                setFloors(data);
            } catch (error) {
                console.error('Error fetching floors:', error);
            }
        };
        fetchFloors();
    }, []);

    const handleChange = (event) => {
        setFloor(event.target.value);
        setClassroomCode('');
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
                {floors.map((floorValue) => (
                    <MenuItem key={floorValue} value={floorValue}>
                        {floorValue}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
