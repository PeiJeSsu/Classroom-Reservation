import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {CardActions, createTheme, Fade, Modal, ThemeProvider} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DateTimeSelection from './DateTimeSelection';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import React, {useLayoutEffect, useState} from "react";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {main: '#1976d2'},
        secondary: {main: '#dc004e'},
        background: {default: '#ffffff', paper: '#ffffff'}
    }
});

const Makechoice = ({open, onClose, initialFloor, initialClassroomCode}) => {
    const [floor, setFloor] = useState(initialFloor);
    const [classroomCode, setClassroomCode] = useState(initialClassroomCode);
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
                            <Card variant="outlined" sx={{width: '40%', height: '35%'}}>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end',}}>
                                    <IconButton aria-label="close" onClick={onClose}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Box>
                                <Box sx={{paddingTop: 1.5, paddingBottom: 1.5, paddingLeft: 4, paddingRight: 4}}>
                                    <FloorAndClassroomCodeSelector
                                        floor={floor} setFloor={setFloor}
                                        classroomCode={classroomCode} setClassroomCode={setClassroomCode}
                                    />
                                </Box>
                                <CardContent sx={{paddingTop: 1.5, paddingBottom: 2, paddingLeft: 4, paddingRight: 4}}>
                                    <DateTimeSelection/>
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button variant="contained" color="primary">
                                        提交
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

export default Makechoice;
