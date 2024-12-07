import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {createTheme,ThemeProvider} from "@mui/material";
import BanUser from "./BanUser";

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

const BanUserButton = ({user, setReload}) => {
    const [openWindow, setOpenWindow] = useState(false);

    const handleOpen = () => {
        setOpenWindow(true);
    };

    const handleClose = () => {
        setOpenWindow(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={handleOpen}>更改使用者狀態</Button>
            <BanUser
                open={openWindow}
                onClose={handleClose}
                user={user}
                setReload={setReload}
            />
        </ThemeProvider>
    );
};

export default BanUserButton;
