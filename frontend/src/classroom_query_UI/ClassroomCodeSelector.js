import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

export default function ClassroomCodeSelector({classroomCode, setClassroomCode}) {
    const handleChange = (event) => {
        setClassroomCode(event.target.value);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{minWidth: 150}}>
            <InputLabel id="classroom-code-label">教室代號</InputLabel>
            <Select
                labelId="classroom-code-label"
                value={classroomCode}
                onChange={handleChange}
                label="教室代號"
            >
                <MenuItem value="101">101</MenuItem>
                <MenuItem value="102">102</MenuItem>
                <MenuItem value="103">103</MenuItem>
                <MenuItem value="104">104</MenuItem>
            </Select>
        </FormControl>
    );
}
