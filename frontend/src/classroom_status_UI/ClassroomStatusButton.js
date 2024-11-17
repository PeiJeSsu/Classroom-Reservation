import React, { useState } from 'react'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import ClassroomStatus from "./ClassroomStatus";

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

export default function ClassroomStatusButton({initialFloor, initialClassroomCode}) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={handleOpen} variant="contained">查看</Button>
            <ClassroomStatus open={open} onClose={handleClose} initialFloor={initialFloor} initialClassroomCode={initialClassroomCode} />
        </ThemeProvider>
    )
}
