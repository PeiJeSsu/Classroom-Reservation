import React from 'react'
import { Snackbar, Alert } from '@mui/material'

function Snackbar({ open, onClose, message }) {
    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
            <Alert onClose={onClose} severity="error">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Snackbar
