import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import axios from 'axios';

export default function ApplyList() {
    const [applications, setApplications] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/classroom_apply/pending')
            .then((response) => {
                setApplications(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [reload]);

    const handleApprove = (id) => {
        axios
            .put(`http://localhost:8080/api/classroom_apply/${id}/approve`)
            .then(() => {
                setReload((prev) => !prev);
            })
            .catch((error) => {
                console.error('Error approving application:', error);
            });
    };

    const handleDeny = (id) => {
        axios
            .put(`http://localhost:8080/api/classroom_apply/${id}/deny`)
            .then(() => {
                setReload((prev) => !prev);
            })
            .catch((error) => {
                console.error('Error denying application:', error);
            });
    };

    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    
    const formatTimeRange = (startTime, endTime) => {
        const startDate = formatDate(startTime);
        const start = formatTime(startTime);
        const endDate = formatDate(endTime);
        const end = formatTime(endTime);
        return `${startDate} ${start} - ${endDate} ${end}`;
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            {applications.length === 0 ? (
                <Typography variant="h6">目前沒有待審批的申請</Typography>
            ) : (
                applications.map((result) => (
                    <Box
                        key={result.id}
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
                            <Typography variant="body1">教室編號: {result.classroom}</Typography>
                            <Typography variant="body1">樓層: {result.floor}</Typography>
                            <Typography variant="body1">
                                借用時間: {formatTimeRange(result.startTime, result.endTime)}
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                sx={{ marginRight: 4 }}
                                onClick={() => handleApprove(result.id)}
                            >
                                同意
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleDeny(result.id)}
                            >
                                不同意
                            </Button>
                        </Box>
                    </Box>
                ))
            )}
        </Paper>
    );
}
