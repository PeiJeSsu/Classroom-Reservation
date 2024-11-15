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
                    setClassroomCodes(codes);
                })
                .catch(error => {
                    console.error("Error fetching classrooms:", error);
                });
        }
    }, [floor, classroomCode, setClassroomCode]);

    const handleChange = (event) => {
        setClassroomCode(event.target.value);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="classroom-code-label">教室代號</InputLabel>
            <Select
                labelId="classroom-code-label"
                value={classroomCodes.includes(classroomCode) ? classroomCode : ''}
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
