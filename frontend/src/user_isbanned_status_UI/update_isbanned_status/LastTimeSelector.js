import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LastTimeSelector = ({ onTimeChange }) => {
    const { t } = useTranslation();
    const [inputMonth, setInputMonth] = useState(0);
    const [inputDay, setInputDay] = useState(0);
    const [inputHour, setInputHour] = useState(0);

    const handleMonthChange = (e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setInputMonth(value);
        onTimeChange(value, inputDay, inputHour);
    };

    const handleDayChange = (e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setInputDay(value);
        onTimeChange(inputMonth, value, inputHour);
    };

    const handleHourChange = (e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setInputHour(value);
        onTimeChange(inputMonth, inputDay, value);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <TextField
                label={t('月')}
                type="number"
                value={inputMonth}
                onChange={handleMonthChange}
                fullWidth
            />
            <TextField
                label={t('日')}
                type="number"
                value={inputDay}
                onChange={handleDayChange}
                fullWidth
            />
            <TextField
                label={t('時')}
                type="number"
                value={inputHour}
                onChange={handleHourChange}
                fullWidth
            />
        </Box>
    );
};

export default LastTimeSelector;
