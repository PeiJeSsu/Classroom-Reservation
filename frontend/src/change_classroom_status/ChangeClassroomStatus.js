import React, {useLayoutEffect, useState} from "react";
import {Box, Card, CardContent, Button, CardActions, Modal, Fade, ThemeProvider, IconButton, createTheme} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import axios from "axios";
import ClassroomStatusSelector from "./ClassroomStatusSelector";
import DateTimeSelection from "../MakeTimeChoice/DateTimeSelection";

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

    useLayoutEffect(() => {
        if (open) {
            setFloor(initialFloor);
            setClassroomCode(initialClassroomCode);
            setInputClassroomStatus(initialClassroomStatus);
            setStartDateTime(null); // 初始化時間
            setEndDateTime(null);
        }
    }, [open, initialFloor, initialClassroomCode, initialClassroomStatus]);

    const handleSubmit = async () => {
        try {
            const url = `/classroom_build/${classroomId}/update-status`;
            const params = {
                ClassroomStatus: inputClassroomStatus,
                startDateTime,
                endDateTime,
            };
            const response = await axios.patch(url, null, { params });
            if (response.status === 200) {
                setReload(true); // 觸發資料重新載入
                onClose(); // 成功後關閉彈窗
            }
        } catch (error) {
            console.error('Error updating Classroom status:', error);
            // 可選：記錄錯誤但不彈出提示
        }
    };
    

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
                                        floor={floor} setFloor={setFloor}
                                        classroomCode={classroomCode} setClassroomCode={setClassroomCode}
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
        </ThemeProvider>
    );
};

export default ChangeClassroomStatus;
