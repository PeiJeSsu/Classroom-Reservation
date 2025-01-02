import React from 'react';
import { Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MapDisplay = ({ floor }) => {
    const { t } = useTranslation();

    const imageMap = {
        B1: require('./B1平面圖.jpg'),
        1: require('./1樓平面圖.jpg'),
        2: require('./2樓平面圖.jpg'),
        3: require('./3樓平面圖.jpg'),
        4: require('./4樓平面圖.jpg'),
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            <Box sx={{ textAlign: 'center' }}>
                {floor && imageMap[floor] ? (
                    <img src={imageMap[floor]} alt={`${floor} floor map`} style={{ width: '80%' }} />
                ) : (
                    <p>{t('請選擇樓層以查看地圖')}</p>
                )}
            </Box>
        </Paper>
    );
};

export default MapDisplay;
