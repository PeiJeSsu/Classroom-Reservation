import React from 'react';
import Card from '@mui/material/Card';
export default function Informaion_strip({user, classroomId, rentalDate, isRented }){
    return(
        <Card sx={{ width: '95%', height: '10%' ,marginLeft:'2%',marginTop:'1%',borderRadius: '10px'}}>
            <p>&nbsp;&nbsp;出租者: {user}&nbsp;&nbsp;
             教室代號:  {classroomId}&nbsp;&nbsp;
            出租日期: {rentalDate}&nbsp;&nbsp;
             出租結果:  {isRented}</p>
        </Card>
    );
}