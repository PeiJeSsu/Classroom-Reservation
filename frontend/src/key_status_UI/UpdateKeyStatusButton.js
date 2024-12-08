import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {createTheme,ThemeProvider} from "@mui/material";
import UpdateKeyStatus from "./UpdateKeyStatus";

const UpdateKeyStatusButton = ({initialFloor, initialClassroomCode, classroomId, keyStatus, borrower, setReload}) => {
    const [openKeyStatus, setOpenKeyStatus] = useState(false);

    const handleOpen = () => {
        setOpenKeyStatus(true);
    };

    const handleClose = () => {
        setOpenKeyStatus(false);
    };

    return (
        <div>
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
        </div>
    );
};

export default UpdateKeyStatusButton;
