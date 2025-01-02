import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ClassroomBanStatus from './ClassroomBanStatus';
import { useTranslation } from 'react-i18next';

const ClassroomBanStatusButton = ({initialFloor, initialClassroomCode, setReload}) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ textTransform: "none" }}>{t('禁用教室')}</Button>
            <ClassroomBanStatus open={open} onClose={handleClose} initialFloor={initialFloor} initialClassroomCode={initialClassroomCode} setReload={setReload}/>
        </div>
    );
};

export default ClassroomBanStatusButton;
