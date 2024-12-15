import React from 'react';
import {FormControl, InputLabel, Select, MenuItem, TextField, Box} from '@mui/material';

const ClassroomStatusSelector = ({ inputClassroomStatus, setInputClassroomStatus }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%', // 如果需要垂直置中
            marginBottom: 2,
        }}>
            <FormControl sx={{ width: 150 }}>
                <InputLabel id="Classroom-status-label">教室狀態</InputLabel>
                <Select
                    labelId="Classroom-status-label"
                    label="教室狀態"
                    value={inputClassroomStatus}
                    onChange={(e) => setInputClassroomStatus(e.target.value)}
                >
                    <MenuItem value="BORROWED">BORROWED</MenuItem>
                    <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                    <MenuItem value="LOST">LOST</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ClassroomStatusSelector;
