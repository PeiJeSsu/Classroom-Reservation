import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Makechoice = ({ onClose }) => {
    const [firstDateTime, setFirstDateTime] = useState(dayjs());
    const [secondDateTime, setSecondDateTime] = useState(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <Card variant="outlined" sx={{ width: '30%', height: '50%' }}>
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ padding: 2 }}>
                        <Typography>樓層</Typography>
                        <TextField label="選擇樓層" select fullWidth />
                        <Typography>教室編號</Typography>
                        <TextField label="選擇教室編號" select fullWidth />
                    </Box>
                    <CardContent sx={{ display: 'flex', gap: 2 }}>
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
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button variant="contained" color="primary">
                            提交
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </LocalizationProvider>
    );
};

export default Makechoice;
