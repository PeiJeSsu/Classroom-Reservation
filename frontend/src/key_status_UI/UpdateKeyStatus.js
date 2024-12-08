import React, {useLayoutEffect, useState} from "react";
import {Box, Card, CardContent, Button, CardActions, Modal, Fade, ThemeProvider, IconButton, createTheme} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import axios from "axios";
import KeyStatusSelector from "./KeyStatusSelector";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#ffffff', paper: '#ffffff' }
    }
});

const UpdateKeyStatus = ({ open, onClose, classroomId, initialFloor, initialClassroomCode, initialKeyStatus, initialBorrower, setReload }) => {
    const [floor, setFloor] = useState(initialFloor);
    const [classroomCode, setClassroomCode] = useState(initialClassroomCode);
    const [inputKeyStatus, setInputKeyStatus] = useState(initialKeyStatus);
    const [inputBorrower, setInputBorrower] = useState(initialBorrower);

    useLayoutEffect(() => {
        if (open) {
            setFloor(initialFloor);
            setClassroomCode(initialClassroomCode);
            setInputKeyStatus(initialKeyStatus);
            setInputBorrower(initialBorrower);
        }
    }, [open, initialFloor, initialClassroomCode, initialKeyStatus, initialBorrower]);

    const handleSubmit = async () => {
        try {
            const url = `/classroom_build/${classroomId}/update-status`;
            const params = {
                keyStatus: inputKeyStatus,
                borrower: inputBorrower,
            };
            const response = await axios.patch(url, null, { params });
            if (response.status === 200) {
                alert('鑰匙狀態更新成功');
                setReload(true);
                onClose();
            }
        } catch (error) {
            console.error('Error updating key status:', error);
            alert('更新鑰匙狀態失敗');
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
                            <Card variant="outlined" sx={{ width: '500', height: '18em' }}>
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
                                    <KeyStatusSelector
                                        inputKeyStatus={inputKeyStatus}
                                        setInputKeyStatus={setInputKeyStatus}
                                        inputBorrower={inputBorrower}
                                        setInputBorrower={setInputBorrower}
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

export default UpdateKeyStatus;
