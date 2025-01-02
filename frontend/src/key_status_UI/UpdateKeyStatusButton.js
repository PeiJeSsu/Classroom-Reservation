import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UpdateKeyStatus from "./UpdateKeyStatus";
import { useTranslation } from 'react-i18next';

const UpdateKeyStatusButton = ({initialFloor, initialClassroomCode, classroomId, keyStatus, borrower, borrowerRole, setReload}) => {
    const { t } = useTranslation();
    const [openKeyStatus, setOpenKeyStatus] = useState(false);
    const [initialBorrower, setInitialBorrower] = useState({email: '', role: null})

    const handleOpen = () => {
        setInitialBorrower({email: borrower, role: borrowerRole});
        setOpenKeyStatus(true);
    };

    const handleClose = () => {
        setOpenKeyStatus(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ textTransform: "none" }}>{t('更改鑰匙狀態')}</Button>
            <UpdateKeyStatus
                open={openKeyStatus}
                onClose={handleClose}
                classroomId={classroomId}
                initialFloor={initialFloor}
                initialClassroomCode={initialClassroomCode}
                initialKeyStatus={keyStatus}
                initialBorrower={initialBorrower}
                setReload={setReload}
            />
        </div>
    );
};

export default UpdateKeyStatusButton;
