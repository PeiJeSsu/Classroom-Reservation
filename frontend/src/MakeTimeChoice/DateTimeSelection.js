import React from 'react';
import TextField from '@mui/material/TextField';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { renderTimeViewClock } from '@mui/x-date-pickers';

const DateTimeSelection = ({ startDateTime, setStartDateTime, endDateTime, setEndDateTime }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <DateTimeField
                sx={{
                    width: '15rem',
                    height: '3rem'
                }}
                label="選擇開始時間"
                value={startDateTime}
                onChange={(newValue) => setStartDateTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                viewRenderers={{
                    hours: renderTimeViewClock
                }}
                views={['year', 'month', 'day', 'hours']}
                format="YYYY/MM/DD HH:00"
            />
            <DateTimeField
                sx={{
                    width: '15rem',
                    height: '3rem'
                }}
                label="選擇結束時間"
                value={endDateTime}
                onChange={(newValue) => setEndDateTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                viewRenderers={{
                    hours: renderTimeViewClock
                }}
                views={['year', 'month', 'day', 'hours']}
                format="YYYY/MM/DD HH:00"
            />
        </div>
    );
};

export default DateTimeSelection;
