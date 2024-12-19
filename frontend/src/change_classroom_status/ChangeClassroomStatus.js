import React, { useLayoutEffect, useState } from "react";
import { Box, Card, CardContent, Button, CardActions, Modal, Fade, ThemeProvider, IconButton, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import ClassroomStatusSelector from "./ClassroomStatusSelector";
import DateTimeSelection from "../MakeTimeChoice/DateTimeSelection";
import CustomSnackbar from '../classroom_status_UI/CustomSnackbar';
import dayjs from "dayjs";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#ffffff', paper: '#ffffff' }
    }
});

const ChangeClassroomStatus = ({ open, onClose, classroomId, initialFloor, initialClassroomCode, initialClassroomStatus, setReload }) => {
    const [floor, setFloor] = useState(initialFloor);
    const [classroomCode, setClassroomCode] = useState(initialClassroomCode);
    const [inputClassroomStatus, setInputClassroomStatus] = useState(initialClassroomStatus);
    const [startDateTime, setStartDateTime] = useState(null); // 新增狀態：開始時間
    const [endDateTime, setEndDateTime] = useState(null); // 新增狀態：結束時間
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: '' });
        if (snackbar.message.includes('更新成功')) {
            onClose(); // 成功提示視窗關閉時，同時關閉更改教室狀態視窗
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const startDateTimeInUTC8 = startDateTime ? dayjs(startDateTime).tz('Asia/Taipei').format() : null;
            const endDateTimeInUTC8 = endDateTime ? dayjs(endDateTime).tz('Asia/Taipei').format() : null;
            const params = new URLSearchParams({
                floor,
                classroomCode,
                status: inputClassroomStatus,
                startTime: startDateTimeInUTC8,
                endTime: endDateTimeInUTC8,
            });

            console.log('Sending request with params: ', params.toString());

            const response = await fetch(`http://localhost:8080/api/classroom_status/update?${params.toString()}`, {
                method: 'POST',
            });

            if (response.ok) {
                const responseData = await response.text(); // 接收返回的訊息
                alert('教室狀態更新成功');
                setReload(true); // 觸發重新加載
                onClose();
            }else {
                const errorData = await response.text();
                throw new Error(errorData || '更新失敗');
            }

        } catch (error) {
            setSnackbar({open: true, message: '教室狀態更新失敗: ' + error.message});
        }
    };

    useLayoutEffect(() => {
        if (open) {
            setFloor(initialFloor);
            setClassroomCode(initialClassroomCode);
            setInputClassroomStatus(initialClassroomStatus);
        }
    }, [open, initialFloor, initialClassroomCode, initialClassroomStatus]);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Modal open={open} onClose={onClose} closeAfterTransition>
                    <Fade in={open}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                gap: 2,
                            }}
                        >
                            <Card variant="outlined" sx={{ width: '%', height: '20em' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <IconButton aria-label="close" onClick={onClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 4, paddingRight: 4 }}>
                                    <FloorAndClassroomCodeSelector
                                        floor={floor} 
                                        setFloor={setFloor}
                                        classroomCode={classroomCode} 
                                        setClassroomCode={setClassroomCode}
                                    />
                                </Box>
                                <CardContent sx={{ paddingTop: 1.5, paddingBottom: 2, paddingLeft: 4, paddingRight: 4 }}>
                                    <ClassroomStatusSelector
                                        inputClassroomStatus={inputClassroomStatus}
                                        setInputClassroomStatus={setInputClassroomStatus}
                                    />
                                    <DateTimeSelection
                                        startDateTime={startDateTime}
                                        setStartDateTime={setStartDateTime}
                                        endDateTime={endDateTime}
                                        setEndDateTime={setEndDateTime}
                                    />
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                                        確定
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Fade>
                </Modal>
            </LocalizationProvider>
            <CustomSnackbar
                open={snackbar.open}
                onClose={handleSnackbarClose}
                message={snackbar.message}
            />
        </ThemeProvider>
    );
};
export default ChangeClassroomStatus;

