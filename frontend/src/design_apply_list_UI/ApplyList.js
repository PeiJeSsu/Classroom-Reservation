import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import axios from 'axios'; // 用來發送 HTTP 請求

export default function ApplyList() {
    const [applications, setApplications] = useState([]); // 用來存儲所有申請
    const [reload, setReload] = useState(false); // 觸發重新抓取資料的狀態

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/classroom_apply/pending')
            .then((response) => {
                setApplications(response.data); // 設置資料
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [reload]); // 當 reload 變化時重新執行

    const handleApprove = (id) => {
        axios
            .put(`http://localhost:8080/api/classroom_apply/${id}/approve`)
            .then(() => {
                setReload((prev) => !prev); // 更新 reload 狀態，觸發重新抓取資料
            })
            .catch((error) => {
                console.error('Error approving application:', error);
            });
    };

    const handleDeny = (id) => {
        axios
            .put(`http://localhost:8080/api/classroom_apply/${id}/deny`)
            .then(() => {
                setReload((prev) => !prev); // 更新 reload 狀態，觸發重新抓取資料
            })
            .catch((error) => {
                console.error('Error denying application:', error);
            });
    };

    // 格式化時間為 24 小時制
    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    // 格式化日期為 yyyy-MM-dd
    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    // 格式化時間範圍，包括日期和時間
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
