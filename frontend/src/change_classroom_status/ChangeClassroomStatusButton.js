import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {createTheme,ThemeProvider} from "@mui/material";
import ChangeClassroomStatus from "./ChangeClassroomStatus.js";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
    },
})

const ChangeClassroomStatusButton = ({initialFloor, initialClassroomCode, classroomId, ClassroomStatus, setReload}) => {
    const [openClassroomStatus, setOpenClassroomStatus] = useState(false);

    const handleOpen = () => {
        setOpenClassroomStatus(true);
    };

    const handleClose = () => {
        setOpenClassroomStatus(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={handleOpen}>更改教室狀態</Button>
            <ChangeClassroomStatus
                open={openClassroomStatus}
                onClose={handleClose}
                classroomId={classroomId}
                initialFloor={initialFloor}
                initialClassroomCode={initialClassroomCode}
                initialClassroomStatus={ClassroomStatus}
                setReload={setReload}
            />
        </ThemeProvider>
    );
};


export default ChangeClassroomStatusButton;
