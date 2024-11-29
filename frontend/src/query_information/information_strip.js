import React from 'react';
import Card from '@mui/material/Card';
export default function Informaion_strip({user, classroomId, rentalDate, isRented }){
    return(
        <Card sx={{ width: '95%', height: '10%' ,marginLeft:'2%',marginTop:'1%'}}>
            <p><strong>出租者:</strong>{user}</p>
            <p><strong>教室代號:</strong> {classroomId}</p>
            <p><strong>出租日期:</strong> {rentalDate}</p>
            <p><strong>出租結果:</strong> {isRented ? "已出租" : "未出租"}</p>
        </Card>
    );
}