import React, { useLayoutEffect, useState } from "react";
import {
    Box, Card, CardContent, Button, CardActions, Modal, Fade,
    ThemeProvider, IconButton, createTheme, Checkbox, FormControlLabel
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import KeyStatusSelector from "./KeyStatusSelector";
import BanUser from "../user_isbanned_status_UI/update_isbanned_status/BanUser";
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';
import ErrorSnackbar from "../custom_snackbar/ErrorSnackbar";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#ffffff', paper: '#ffffff' }
    }
});

const UpdateKeyStatus = ({ open, onClose, classroomId, initialFloor, initialClassroomCode, initialKeyStatus, initialBorrower, setReload }) => {
    const { t } = useTranslation();

    const [floor, setFloor] = useState(initialFloor);
    const [classroomCode, setClassroomCode] = useState(initialClassroomCode);
    const [inputKeyStatus, setInputKeyStatus] = useState(initialKeyStatus);
    const [inputBorrower, setInputBorrower] = useState(initialBorrower);
    const [tmpBorrower, setTmpBorrower] = useState(initialBorrower);
    const [openBanUser, setOpenBanUser] = useState(false);
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useLayoutEffect(() => {
        if (open) {
            setFloor(initialFloor);
            setClassroomCode(initialClassroomCode);
            setInputKeyStatus(initialKeyStatus);
            setInputBorrower(initialBorrower);
            setTmpBorrower(initialBorrower);
            setIsCheckBoxChecked(false);
        }
    }, [open, initialFloor, initialClassroomCode, initialKeyStatus, initialBorrower]);

    const handleSubmit = async () => {
        if (inputKeyStatus !== "AVAILABLE" && (!inputBorrower || !inputBorrower.email.trim())) {
            setErrorMessage(t('請填寫借用人'));
            setOpenSnackbar(true);
            setTimeout(() => {
                setErrorMessage(t('請填寫借用人'));
                setOpenSnackbar(true);
            }, 100);
            return;
        }
        try {
            const url = `/classroom_build/${classroomId}/update-status`;
            const params = {
                keyStatus: inputKeyStatus,
                ...(inputKeyStatus !== 'AVAILABLE' && {
                    borrower: inputBorrower.email.trim(),
                    borrowerRole: inputBorrower.role
                })
            };
            const response = await apiConfig.patch(url, null, { params });
            if (response.status === 200) {
                alert(t('鑰匙狀態更新成功'));
                setReload(true);
                onClose();
                if (isCheckBoxChecked) {
                    setOpenBanUser(true);
                }
            }
        } catch (error) {
            console.error('Error updating key status:', error);
            alert(t('更新鑰匙狀態失敗'));
        }
    };

    const determineLabel = () => {
        if (tmpBorrower.role === 'admin' || tmpBorrower.role === 'borrower') {
            return t('禁用鑰匙借用者');
        } else if (tmpBorrower.role === 'unknown') {
            return t('借用人不是系統使用者，請自行處理');
        } else {
            return "";
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
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        >
                            <Card variant="outlined" sx={{ width: '500', height: '19em' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton aria-label="close" onClick={onClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 4, paddingRight: 4 }}>
                                    <FloorAndClassroomCodeSelector
                                        floor={floor} setFloor={setFloor} classroomCode={classroomCode} setClassroomCode={setClassroomCode} disabled={true}
                                    />
                                </Box>
                                <CardContent sx={{ paddingTop: 1.5, paddingBottom: 2, paddingLeft: 4, paddingRight: 4 }}>
                                    <KeyStatusSelector
                                        inputKeyStatus={inputKeyStatus}
                                        setInputKeyStatus={setInputKeyStatus}
                                        inputBorrower={inputBorrower}
                                        setInputBorrower={setInputBorrower}
                                    />
                                    {tmpBorrower.role !== null && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isCheckBoxChecked}
                                                    onChange={(e) => setIsCheckBoxChecked(e.target.checked)}
                                                    disabled={tmpBorrower.role !== 'admin' && tmpBorrower.role !== 'borrower'}
                                                />
                                            }
                                            label={determineLabel()}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                mt: 1
                                            }}
                                        />
                                    )}
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center', mt: tmpBorrower.role === null ? 2 : -2}}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ textTransform: "none" }}>
                                        {t('更改')}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Fade>
                </Modal>
                <BanUser
                    open={openBanUser}
                    onClose={() => setOpenBanUser(false)}
                    user={tmpBorrower}
                    setReload={setReload}
                />
                <ErrorSnackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    message={errorMessage}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default UpdateKeyStatus;
