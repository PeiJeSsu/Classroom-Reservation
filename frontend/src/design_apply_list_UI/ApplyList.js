import React, {useState, useEffect} from 'react';
import {Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, IconButton} from '@mui/material';
import axios from 'axios';
import CloseIcon from "@mui/icons-material/Close";
import HistoryDialog from "./historyDialog";
import Card from '@mui/material/Card';

export default function ApplyList() {
    const [applications, setApplications] = useState([]);
    const [reload, setReload] = useState(false);
    const [personalInfo, setPersonalInfo] = useState([]);
    const [open, setOpen] = useState(false);
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

    const handleClose = () => {
        setOpen(false);
    };
    const showHistory = (borrower) => {
        fetch(`http://localhost:8080/api/classroom_apply/borrower/${borrower}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("後端傳回的完整資料: ", data);

                const transformedData = data.map((item) => ({
                    user: item.borrower,
                    classroom: item.classroom,
                    rentalDate: new Date(item.startTime).toLocaleDateString(),
                    isRented:
                        item.isApproved === null || item.isApproved === undefined
                            ? "尚未審核"
                            : item.isApproved
                                ? "已出租"
                                : "未出租",
                }));
                setPersonalInfo(transformedData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("無法加載資料，請稍後再試。");
            });
        setOpen(true);
    };
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
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
    };

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString([], {year: 'numeric', month: '2-digit', day: '2-digit'});
    };

    const formatTimeRange = (startTime, endTime) => {
        const startDate = formatDate(startTime);
        const start = formatTime(startTime);
        const endDate = formatDate(endTime);
        const end = formatTime(endTime);
        return `${startDate} ${start} - ${endDate} ${end}`;
    };

    return (
        <Paper elevation={3} sx={{padding: '20px', marginTop: '20px'}}>
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
                        <Box sx={{display: 'flex', gap: 2}}>

                            <Typography variant="body1">教室編號: {result.classroom}</Typography>
                            <Typography variant="body1">樓層: {result.floor}</Typography>
                            <Typography
                                variant="body1">借用人: {result.borrower ? result.borrower : "未知使用者"}</Typography>
                            <Typography variant="body1">
                                借用時間: {formatTimeRange(result.startTime, result.endTime)}
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                sx={{marginRight: 4}}
                                onClick={() => showHistory(result.borrower)}>
                                檢視歷史紀錄
                            </Button>
                            <Button
                                variant="contained"
                                sx={{marginRight: 4}}
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
            <HistoryDialog open={open} onClose={handleClose} title="歷史紀錄">
                {personalInfo.length === 0 ? (
                    <Typography>尚無歷史紀錄</Typography>
                ) : (
                    personalInfo.map((info, index) => (

                        <Box
                            key={info.id}
                            sx={{
                                display: 'flex',
                                height: '35px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                            }}
                        >
                            <Box sx={{display: 'flex'}}>
                                <Typography variant="body1">
                                    借用者: {info.user}&nbsp;&nbsp;
                                </Typography>
                                <Typography variant="body1">
                                    教室代號: {info.classroom}&nbsp;&nbsp;
                                </Typography>
                                <Typography variant="body1">
                                    出租日期: {info.rentalDate}&nbsp;&nbsp;
                                </Typography>
                                <Typography variant="body1">
                                    出租結果: {info.isRented}&nbsp;&nbsp;
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </HistoryDialog>
        </Paper>
    );
}
