import React, {useEffect, useState} from 'react';
import {Box, Typography, Paper, Button} from '@mui/material';
import ClassroomStatusTestButton from "../classroom_status_UI/ClassroomStatusButton";

export default function ResultList({floor, classroomCode}) {
    const [classrooms, setClassrooms] = useState([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                let url = 'http://localhost:8080/classroom_build/all';
                if (classroomCode) {
                    url = `http://localhost:8080/classroom_build/room/${classroomCode}`;
                }  else if (floor) {
                    url = `http://localhost:8080/classroom_build/floor/${floor}`;
                }
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const classroomData = Array.isArray(data) ? data : [data];
                setClassrooms(classroomData);
            } catch (error) {
                console.log("error fetching classroom data", error)
            }
        };
        fetchClassrooms();
    }, [floor, classroomCode])

    return (
        <Paper elevation={3} sx={{padding: '20px', marginTop: '20px'}}>
            {classrooms.length === 0 ? (
                <Typography variant="body1">沒有找到相關的教室。</Typography>
            ) : (
                classrooms.map((classroom) => (
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
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2
                            }}
                        >
                            <ClassroomStatusTestButton variant="contained" initialFloor={classroom.floor} initialClassroomCode={classroom.roomNumber} />
                            <Button variant="contained">申請</Button>
                        </Box>
                    </Box>
                ))
            )}
        </Paper>
    );
}
