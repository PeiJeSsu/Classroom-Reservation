import React, { useState } from 'react'
import {ThemeProvider, createTheme, Box, Modal, Fade, IconButton, Paper, Grid, Snackbar} from '@mui/material'
import { Close } from '@mui/icons-material'
import DateSelector from './DateSelector'
import FloorRoomSelector from './FloorRoomSelector'
import ScheduleTable from './ScheduleTable'
import SearchField from './SearchField'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#ffffff', paper: '#ffffff' }
    }
})

function ClassroomStatus({ open, onClose }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [floor, setFloor] = useState('')
    const [room, setRoom] = useState('')
    const [year, setYear] = useState(currentDate.getFullYear().toString())
    const [month, setMonth] = useState((currentDate.getMonth() + 1).toString().padStart(2, '0'))
    const [day, setDay] = useState(currentDate.getDate().toString().padStart(2, '0'))
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={onClose} closeAfterTransition>
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%', maxWidth: 1000,
                        bgcolor: 'background.paper', boxShadow: 24, p: 4, overflow: 'hidden',
                    }}>
                        <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 4, right: 2 }}>
                            <Close />
                        </IconButton>

                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Grid container columnSpacing={2} rowSpacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <FloorRoomSelector
                                    floor={floor} setFloor={setFloor}
                                    room={room} setRoom={setRoom}
                                />
                                <DateSelector
                                    currentDate={currentDate} setCurrentDate={setCurrentDate}
                                    year={year} setYear={setYear}
                                    month={month} setMonth={setMonth}
                                    day={day} setDay={setDay}
                                />
                            </Grid>

                            <SearchField
                                year={year} setYear={setYear}
                                month={month} setMonth={setMonth}
                                day={day} setDay={setDay}
                                setErrorMessage={setErrorMessage}
                                setOpenSnackbar={setOpenSnackbar}
                                setCurrentDate={setCurrentDate}
                            />

                            <ScheduleTable currentDate={currentDate} />

                        </Paper>
                        <Snackbar
                            open={openSnackbar}
                            onClose={() => setOpenSnackbar(false)}
                            message={errorMessage}
                        />
                    </Box>
                </Fade>
            </Modal>
        </ThemeProvider>
    )
}

export default ClassroomStatus
