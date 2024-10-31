import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

export default function ClassroomCodeSelector({ classroomCode, setClassroomCode, floor, setSearchQuery  }) {
    const [classroomOptions, setClassroomOptions] = useState([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            if (floor) {
                try {
                    const response = await axios.get(`http://localhost:8080/classroom_build/floor/${floor}`);
                    const rooms = response.data;
                    setClassroomOptions(rooms.map(room => room.roomNumber));

                    if (!rooms.some(room => room.roomNumber === classroomCode)) {
                        setClassroomCode('');
                    }
                } catch (error) {
                    console.error('Error fetching classroom codes:', error);
                    setClassroomOptions([]);
                }
            } else {
                setClassroomOptions([]);
                setClassroomCode('');
            }
        };

        fetchClassrooms();
    }, [floor, classroomCode, setClassroomCode]);

    const handleChange = (event) => {
        setClassroomCode(event.target.value);
        setSearchQuery('');
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="classroom-code-label">教室代號</InputLabel>
            <Select
                labelId="classroom-code-label"
                value={classroomCode}
                onChange={handleChange}
                label="教室代號"
            >
                <MenuItem value="">全部</MenuItem>
                {classroomOptions.map((roomNumber) => (
                    <MenuItem key={roomNumber} value={roomNumber}>
                        {roomNumber}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
