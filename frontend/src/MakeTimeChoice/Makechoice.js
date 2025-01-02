import React, { useLayoutEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardActions, createTheme, Fade, Modal, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DateTimeSelection from './DateTimeSelection';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import ErrorSnackbar from '../custom_snackbar/ErrorSnackbar';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

dayjs.extend(utc);
dayjs.extend(timezone);

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#ffffff', paper: '#ffffff' }
    }
});

const Makechoice = ({ open, onClose, initialFloor, initialClassroomCode, setDisplayReload }) => {
    const { t } = useTranslation();
    const [floor, setFloor] = useState(initialFloor);
    const [classroomCode, setClassroomCode] = useState(initialClassroomCode);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const userEmail = localStorage.getItem("userEmail");

    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startTime || !endTime) {
            setSnackbar({ open: true, message: t('開始時間和結束時間不能為空！') });
            return;
        }

        const borrower = localStorage.getItem("userName");
        if (!borrower) {
            setSnackbar({ open: true, message: '未找到借用者，請重新登入後再試！' });
            return;
        }

        console.log({
            floor,
            classroom: classroomCode,
            startTime: dayjs(startTime).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss'),
            endTime: dayjs(endTime).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss'),
            borrower: userEmail
        });

        try {
            const borrower = localStorage.getItem("userName");
            if (!borrower) {
                setSnackbar({ open: true, message: t('未找到借用者！') });
                return;
            }

            const response = await apiConfig.post('/api/classroom_apply/apply', {
                floor,
                classroom: classroomCode,
                startTime: dayjs(startTime).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss'),
                endTime: dayjs(endTime).tz('Asia/Taipei').format('YYYY-MM-DDTHH:mm:ss'),
                borrower: userEmail
            });

            if (response.status === 200) {
                const responseData = await response.data;
                alert(t('申請成功: ') + responseData);
            } else {
                const errorData = await response.data;
                if (errorData === 'User is banned. Should not apply classroom.') {
                    setDisplayReload(true);
                    onClose(true);
                    alert(t('您已經被禁用申請權限，系統將自動刷新頁面，禁用訊息顯示於右上角'));
                }
                setSnackbar({ open: true, message: t('申請失敗: ') + errorData });
            }
        } catch (error) {
            setSnackbar({ open: true, message: t('申請失敗: ') + error.message });
        }
    };

    useLayoutEffect(() => {
        if (open) {
            setFloor(initialFloor);
            setClassroomCode(initialClassroomCode);
        }
    }, [initialFloor, initialClassroomCode, open]);

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
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        >
                            <Card variant="outlined" sx={{ width: '%', height: '17em' }}>
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
                                    <DateTimeSelection startDateTime={startTime} setStartDateTime={setStartTime}
                                                       endDateTime={endTime} setEndDateTime={setEndTime}
                                    />
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ textTransform: "none" }}>
                                        {t('提交')}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Fade>
                </Modal>
            </LocalizationProvider>
            <ErrorSnackbar
                open={snackbar.open}
                onClose={handleSnackbarClose}
                message={snackbar.message}
            />
        </ThemeProvider>
    );
};

export default Makechoice;
