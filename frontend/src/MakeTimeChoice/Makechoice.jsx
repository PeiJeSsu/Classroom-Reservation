import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DateTimeSelection from './DateTimeSelection';
import FloorAndRoomSelection from './FloorAndRoomSelection';

const Makechoice = ({ onClose }) => {
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
                <Card variant="outlined" sx={{ width: '40%', height: '45%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end',}}>
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ padding: 2 }}>
                        <FloorAndRoomSelection />
                    </Box>
                    <CardContent>
                        <DateTimeSelection />
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
