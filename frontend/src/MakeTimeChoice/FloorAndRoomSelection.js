import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const FloorAndRoomSelection = () => {
    return (
        <div>
            <Typography>樓層</Typography>
            <TextField label="選擇樓層" select fullWidth />
            <Typography sx={{ marginTop: 2 }}>教室編號</Typography>
            <TextField label="選擇教室編號" select fullWidth />
        </div>
    );
};

export default FloorAndRoomSelection;
