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
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import ErrorSnackbar from '../custom_snackbar/ErrorSnackbar';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import LastTimeSelector from "../user_isbanned_status_UI/update_isbanned_status/LastTimeSelector";
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

const MAX_SECONDS = 60 * 365 * 24 * 60 * 60; // 60年

const ClassroomBanStatus = ({ open, onClose, initialFloor, initialClassroomCode, setReload }) => {
    const { t } = useTranslation();
    const [floor, setFloor] = useState(initialFloor);
    const [classroomCode, setClassroomCode] = useState(initialClassroomCode);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [inputMonth, setInputMonth] = useState(0);
    const [inputDay, setInputDay] = useState(0);
    const [inputHour, setInputHour] = useState(0);

    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: '' });
    };

    const calculateBanDuration = () => {
        const totalSeconds = (inputMonth * 30 * 24 * 60 * 60) + (inputDay * 24 * 60 * 60) + (inputHour * 60 * 60);
        return Math.min(totalSeconds, MAX_SECONDS);
    };

    const handleSubmit = async () => {
        try {
            if (inputMonth === 0 && inputDay === 0 && inputHour === 0) {
                setSnackbar({ open: true, message: t('請至少輸入一個非零的時間') });
                return;
            }

            const unbanTime = calculateBanDuration();

            if (unbanTime === MAX_SECONDS) {
                setSnackbar({
                    open: true,
                    message: t('系統最高接受60年的禁用時間，您輸入的時間大於等於60年，將自動設為60年（請注意！這裡的每年皆以365天計算，故有些許誤差）')
                });
            }

            const response = await apiConfig.patch(`/classroom_build/${classroomCode}/ban?unbanTime=${unbanTime}`);

            if (response.status === 200) {
                alert(t('教室已成功禁用'));
                setReload(true);
                onClose();
            } else {
                const errorData = await response.data;
                setSnackbar({ open: true, message: `${t('禁用失敗')}: ${errorData}` });
            }
        } catch (error) {
            setSnackbar({ open: true, message: `${t('禁用失敗')}: ${error.message}` });
        }
    };

    useLayoutEffect(() => {
        if (open) {
            setFloor(initialFloor);
            setClassroomCode(initialClassroomCode);
        }
    }, [initialFloor, initialClassroomCode, open]);

    const handleTimeChange = (month, day, hour) => {
        setInputMonth(month);
        setInputDay(day);
        setInputHour(hour);
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
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        >
                            <Card variant="outlined" sx={{ width: '30%', height: '17em' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                                    <IconButton aria-label={t("關閉")} onClick={onClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 4, paddingRight: 4 }}>
                                    <FloorAndClassroomCodeSelector
                                        floor={floor} setFloor={setFloor}
                                        classroomCode={classroomCode} setClassroomCode={setClassroomCode} disabled={true}
                                    />
                                </Box>
                                <CardContent sx={{ paddingTop: 1.5, paddingBottom: 2, paddingLeft: 4, paddingRight: 4 }}>
                                    <LastTimeSelector onTimeChange={handleTimeChange} />
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ textTransform: "none" }}>
                                        {t("提交")}
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

export default ClassroomBanStatus;
