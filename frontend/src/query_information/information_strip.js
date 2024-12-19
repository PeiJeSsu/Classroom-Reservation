import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
export default function Informaion_strip({user, classroomId, rentalDate, isRented }){
    return(

    <Box
        key={user.id}
        sx={{
            display: 'flex',
            height:'35px',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '20px',
        }}
    >
        <Box sx={{ display: 'flex' }}>
            <Typography variant="body1" >
                借用人: {user}&nbsp;&nbsp;
            </Typography>
            <Typography variant="body1" >
                教室代號:  {classroomId}&nbsp;&nbsp;
            </Typography>
            <Typography variant="body1" >
                出租日期: {rentalDate}&nbsp;&nbsp;
            </Typography>
            <Typography variant="body1" >
                出租結果:  {isRented}&nbsp;&nbsp;
            </Typography>
        </Box>
    </Box>
    );
}