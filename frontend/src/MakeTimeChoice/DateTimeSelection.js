import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const DateTimeSelection = () => {
    const [firstDateTime, setFirstDateTime] = useState(dayjs());
    const [secondDateTime, setSecondDateTime] = useState(dayjs());

    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <DateTimePicker
                label="選擇開始時間"
                value={firstDateTime}
                onChange={(newValue) => setFirstDateTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: '48%' }}
            />
            <DateTimePicker
                label="選擇結束時間"
                value={secondDateTime}
                onChange={(newValue) => setSecondDateTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: '48%' }}
            />
        </div>
    );
};

export default DateTimeSelection;
