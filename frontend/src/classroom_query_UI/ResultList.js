import React, {useEffect, useState} from 'react';
import {Box, Typography, Paper, Button} from '@mui/material';

export default function ResultList() {
    const [classrooms, setClassrooms] = useState([]);
    useEffect(() =>{
        const fetchClassrooms = async () =>{
            try{
                const response = await fetch('http://localhost:8080/classroom_build/all');
                if(!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setClassrooms(data)
            }catch (error){
                console.log("error fetching classroom data",error)
            }
        };
        fetchClassrooms();
    },[])

    return (
        <Paper elevation={3} sx={{padding: '20px', marginTop: '20px'}}>
            {classrooms.map((classroom) => (
                <Box
                    key={classroom.id}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '20px',
                    }}
                >
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Typography variant="body1">教室編號: {classroom.roomNumber}</Typography>
                        <Typography variant="body1">樓層: {classroom.floor}</Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" sx={{marginRight: 4}}>查看</Button>
                        <Button variant="contained">申請</Button>
                    </Box>
                </Box>
            ))}
        </Paper>
    );
}
