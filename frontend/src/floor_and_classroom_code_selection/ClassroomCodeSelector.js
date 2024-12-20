import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ClassroomCodeSelector({ floor, classroomCode, setClassroomCode }) {
    const [classroomCodes, setClassroomCodes] = useState([]);

    useEffect(() => {
        if (floor) {
            fetch(`http://localhost:8080/classroom_build/floor/${floor}`)
                .then((response) => response.json())
                .then((data) => {
                    const codes = data.map((classroom) => classroom.roomNumber);
                    setClassroomCodes(['全部', ...codes]);
                })
                .catch((error) => {
                    console.error('Error fetching classrooms:', error);
                });
        } else {
            setClassroomCodes(['全部']);
        }
    }, [floor]);

    const handleChange = (event) => {
        const value = event.target.value;
        setClassroomCode(value === '全部' ? null : value);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="classroom-code-label">教室代號</InputLabel>
            <Select
                labelId="classroom-code-label"
                value={classroomCode === null ? '全部' : classroomCode}
                onChange={handleChange}
                label="教室代號"
            >
                {classroomCodes.map((code) => (
                    <MenuItem key={code} value={code}>
                        {code}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
