import React, { useState } from 'react'
import { Button } from '@mui/material'
import ClassroomStatus from "./ClassroomStatus";
import { useTranslation } from 'react-i18next';

export default function ClassroomStatusButton({initialFloor, initialClassroomCode}) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" sx={{ textTransform: "none" }}>{t('查看')}</Button>
            <ClassroomStatus open={open} onClose={handleClose} initialFloor={initialFloor} initialClassroomCode={initialClassroomCode} />
        </div>
    );
}
