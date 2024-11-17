import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import dayjs from 'dayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers';

const DateTimeSelection = () => {
    const [firstDateTime, setFirstDateTime] = useState(dayjs());
    const [secondDateTime, setSecondDateTime] = useState(dayjs());

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <DateTimeField
                sx={{
                    width: '15rem',
                    height: '3rem'
                }}
                label="選擇開始時間"
                value={firstDateTime}
                onChange={(newValue) => setFirstDateTime(newValue)}
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
                value={secondDateTime}
                onChange={(newValue) => setSecondDateTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                }}
                views={['year', 'month', 'day', 'hours']}
                format="YYYY/MM/DD HH:00"
            />
        </div>
    );
};

export default DateTimeSelection;