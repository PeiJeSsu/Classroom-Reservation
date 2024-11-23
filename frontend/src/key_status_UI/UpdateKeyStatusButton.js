import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {createTheme,ThemeProvider} from "@mui/material";
import UpdateKeyStatus from "./UpdateKeyStatus";

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

const UpdateKeyStatusButton = ({initialFloor, initialClassroomCode, classroomId, keyStatus, borrower, setReload}) => {
    const [openKeyStatus, setOpenKeyStatus] = useState(false);

    const handleOpen = () => {
        setOpenKeyStatus(true);
    };

    const handleClose = () => {
        setOpenKeyStatus(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={handleOpen}>更改鑰匙狀態</Button>
            <UpdateKeyStatus
                open={openKeyStatus}
                onClose={handleClose}
                classroomId={classroomId}
                initialFloor={initialFloor}
                initialClassroomCode={initialClassroomCode}
                initialKeyStatus={keyStatus}
                initialBorrower={borrower}
                setReload={setReload}
            />
        </ThemeProvider>
    );
};

export default UpdateKeyStatusButton;
