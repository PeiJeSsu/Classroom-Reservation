import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ClassroomCodeSelector({ floor, classroomCode, setClassroomCode }) {
    const [classroomCodes, setClassroomCodes] = useState([]);

    useEffect(() => {
        if (floor) {
            fetch(`http://localhost:8080/classroom_build/floor/${floor}`)
                .then(response => response.json())
                .then(data => {
                    const codes = data.map(classroom => classroom.roomNumber);
                    setClassroomCodes(['全部', ...codes]);
                })
                .catch(error => {
                    console.error("Error fetching classrooms:", error);
                });
        } else {
            // When floor is null or '全部', reset classroom codes
            setClassroomCodes([]);
        }
    }, [floor, setClassroomCode]);

    const handleChange = (event) => {
        setClassroomCode(event.target.value);
        if (event.target.value === '全部') setClassroomCode(null);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="classroom-code-label">教室代號</InputLabel>
            <Select
                labelId="classroom-code-label"
                value={classroomCodes.includes(classroomCode) ? classroomCode : ''}
                onChange={handleChange}
                label="教室代號"
                disabled={classroomCodes.length === 0}
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