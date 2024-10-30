import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Makechoice from './Makechoice';

const MakeChoiceButton = () => {
    const [isMakeChoiceOpen, setIsMakeChoiceOpen] = useState(false);

    const handleOpen = () => {
        setIsMakeChoiceOpen(true);
    };

    const handleClose = () => {
        setIsMakeChoiceOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                打開選擇視窗
            </Button>
            {isMakeChoiceOpen && <Makechoice onClose={handleClose} />}
        </div>
    );
};

export default MakeChoiceButton;
