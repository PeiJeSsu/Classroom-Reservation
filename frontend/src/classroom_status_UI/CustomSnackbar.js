import React from 'react'
import {Snackbar, Alert} from '@mui/material'

function CustomSnackbar({open, onClose, message}) {
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={onClose} key={message}>
            <Alert onClose={onClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar
