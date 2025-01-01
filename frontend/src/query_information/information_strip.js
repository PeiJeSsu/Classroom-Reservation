import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Informaion_strip({ user, classroomId, rentalDate, isRented, floor, endTime }) {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                height: '35px',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '20px',
            }}
        >
            <Box sx={{ display: 'flex' }}>
                <Typography variant="body1" sx={{ minWidth: "160px" }}>
                    {t('教室編號')}: {classroomId}
                </Typography>
                <Typography variant="body1" sx={{ minWidth: "90px" }}>
                    {t('樓層')}: {floor}
                </Typography>
                <Typography variant="body1" sx={{ minWidth: "200px" }}>
                    {t('借用人')}: {t(user)}&nbsp;&nbsp;
                </Typography>
                <Typography variant="body1" sx={{ minWidth: "470px" }}>
                    {t('借用時間')}: {rentalDate}&nbsp; {t('到')} &nbsp;{endTime}&nbsp;&nbsp;
                </Typography>
                <Typography variant="body1" sx={{ minWidth: "160px" }}>
                    {t('審查結果')}: {isRented}&nbsp;&nbsp;
                </Typography>
            </Box>
        </Box>
    );
}
