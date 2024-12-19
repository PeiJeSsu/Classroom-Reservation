import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ClassroomStatusButton from "../classroom_status_UI/ClassroomStatusButton";
import MakeChoiceButton from "../MakeTimeChoice/MakeChoiceButton";
import UpdateKeyStatusButton from "../key_status_UI/UpdateKeyStatusButton";
import ChangeClassroomStatusButton from "../change_classroom_status/ChangeClassroomStatusButton";

export default function ResultList({ floor, classroomCode, reload, setReload }) {
    const [classrooms, setClassrooms] = useState([]);
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                let url = '/classroom_build/all';
                if (classroomCode) {
                    url = `/classroom_build/room/${classroomCode}`;
                } else if (floor) {
                    url = `/classroom_build/floor/${floor}`;
                }
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const classroomData = Array.isArray(data) ? data : [data];
                setClassrooms(classroomData);
            } catch (error) {
                console.error("Error fetching classroom data", error);
            }
        };

        const fetchClassroomStatuses = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/classroom_status/statusNow');
                if (!response.ok) throw new Error('Network response was not ok');
                const statuses = await response.json();

                // Update the classroom data with the status fetched from the API
                setClassrooms((prevClassrooms) =>
                    prevClassrooms.map((classroom) => ({
                        ...classroom,
                        status: statuses[classroom.roomNumber] || 'AVAILABLE', // Default to 'AVAILABLE' if no status is found
                    }))
                );
            } catch (error) {
                console.error("Error fetching classroom statuses", error);
            }
        };

        fetchClassrooms();
        fetchClassroomStatuses();

        if (reload) {
            setReload(false);
        }
    }, [floor, classroomCode, reload, setReload]);

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
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
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography variant="body1" sx={{ minWidth: '110px' }}>教室編號: {classroom.roomNumber}</Typography>
                            <Typography variant="body1" sx={{ minWidth: '60px' }}>樓層: {classroom.floor}</Typography>
                            
                            <Typography variant="body1" sx={{ minWidth: '180px' }}>
                                教室狀態: {classroom.status === 'BORROWED' ? '不可用' : classroom.status === 'AVAILABLE' ? '可用' : '未知'}
                            </Typography>


                            {userRole !== "borrower" && (
                                <>
                                    <Typography variant="body1" sx={{ minWidth: '180px' }}>鑰匙狀態: {classroom.keyStatus}</Typography>
                                    {classroom.borrower && (
                                        <Typography variant="body1">借用人: {classroom.borrower}</Typography>
                                    )}
                                </>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2
                            }}
                        >
                            <ClassroomStatusButton variant="contained" initialFloor={classroom.floor} initialClassroomCode={classroom.roomNumber} />
                            <MakeChoiceButton variant="contained" initialFloor={classroom.floor} initialClassroomCode={classroom.roomNumber} />
                            {userRole !== "borrower" && (
                                <UpdateKeyStatusButton
                                    variant="contained"
                                    initialFloor={classroom.floor}
                                    initialClassroomCode={classroom.roomNumber}
                                    classroomId={classroom.id}
                                    keyStatus={classroom.keyStatus}
                                    borrower={classroom.borrower || ''}
                                    setReload={setReload}
                                />
                            )}

                            {userRole !== "borrower" && (
                                <ChangeClassroomStatusButton
                                    variant="contained"
                                    initialFloor={classroom.floor}
                                    initialClassroomCode={classroom.roomNumber}
                                    classroomId={classroom.id}
                                    classroomtatus={classroom.classroomStatus}
                                    setReload={setReload}
                                />
                            )}
                        </Box>
                    </Box>
                ))
            )}
        </Paper>
    );
}
