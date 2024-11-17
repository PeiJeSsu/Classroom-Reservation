import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Makechoice from './Makechoice';
import {createTheme,ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
    },
})

const MakeChoiceButton = ({initialFloor, initialClassroomCode}) => {
    const [isMakeChoiceOpen, setIsMakeChoiceOpen] = useState(false);

    const handleOpen = () => {
        setIsMakeChoiceOpen(true);
    };

    const handleClose = () => {
        setIsMakeChoiceOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={handleOpen}>申請</Button>
            <Makechoice open={isMakeChoiceOpen} onClose={handleClose} initialFloor={initialFloor} initialClassroomCode={initialClassroomCode} />
        </ThemeProvider>
    );
};

export default MakeChoiceButton;
