import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Informaion_strip({ user, classroomId, rentalDate, isRented, floor, endTime }) {
    const { t, i18n } = useTranslation();

    const isChinese = i18n.language === 'zh_tw';
    const styles = {
        classroomIdWidth: isChinese ? "160px" : "180px",
        floorWidth: isChinese ? "110px" : "110px",
        userWidth: isChinese ? "180px" : "200px",
        rentalTimeWidth: isChinese ? "450px" : "460px",
        isRentedWidth: isChinese ? "160px" : "160px",
    };

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
                <Typography variant="body1" sx={{ minWidth: styles.classroomIdWidth }}>
                    {t('教室編號')}: {classroomId}
                </Typography>
                <Typography variant="body1" sx={{ minWidth: styles.floorWidth }}>
                    {t('樓層')}: {floor}
                </Typography>
                <Typography variant="body1" sx={{ minWidth: styles.userWidth }}>
                    {t('借用人')}: {t(user)}&nbsp;&nbsp;
                </Typography>
                <Typography variant="body1" sx={{ minWidth: styles.rentalTimeWidth }}>
                    {t('借用時間')}: {rentalDate}&nbsp; {t('到')} &nbsp;{endTime}&nbsp;&nbsp;
                </Typography>
                <Typography variant="body1" sx={{ minWidth: styles.isRentedWidth }}>
                    {t('審查結果')}: {isRented}&nbsp;&nbsp;
                </Typography>
            </Box>
        </Box>
    );
}
