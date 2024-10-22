<<<<<<< Updated upstream
"use client"

import React, { useState } from 'react'
import {
    ThemeProvider, createTheme, Box, Paper, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Typography, Select, MenuItem, FormControl,
    InputLabel, Grid, Modal, Fade, TextField,
    Snackbar, Alert
} from '@mui/material'
import { ChevronLeft, ChevronRight, Search, Close } from '@mui/icons-material'

const days = ['星期一', '星期二', '星期三', '星期四', '星期五']
const timeSlots = ['08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00', '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00', '15:00 ~ 16:00', '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '19:00 ~ 20:00']
=======
import React, { useState } from 'react'
import {ThemeProvider, createTheme, Box, Modal, Fade, IconButton, Paper, Grid, Snackbar} from '@mui/material'
import { Close } from '@mui/icons-material'
import DateSelector from './DateSelector'
import FloorRoomSelector from './FloorRoomSelector'
import ScheduleTable from './ScheduleTable'
import SearchField from './SearchField'
>>>>>>> Stashed changes

const theme = createTheme({
    palette: {
        mode: 'light',
<<<<<<< Updated upstream
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
    },
=======
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        background: { default: '#ffffff', paper: '#ffffff' }
    }
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    const handlePrev = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate)
            newDate.setDate(newDate.getDate() - 7)
            updateDateInputs(newDate)
            return newDate
        })
    }

    const handleNext = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate)
            newDate.setDate(newDate.getDate() + 7)
            updateDateInputs(newDate)
            return newDate
        })
    }

    const handleFloorChange = (event) => {
        setFloor(event.target.value)
    }

    const handleRoomChange = (event) => {
        setRoom(event.target.value)
    }

    const updateDateInputs = (date) => {
        setYear(date.getFullYear().toString())
        setMonth((date.getMonth() + 1).toString().padStart(2, '0'))
        setDay(date.getDate().toString().padStart(2, '0'))
    }

    const handleSearch = () => {
        const searchDate = new Date(`${year}-${month}-${day}`)

        if (isNaN(searchDate.getTime())) {
            setErrorMessage('請輸入有效的日期格式')
            setOpenSnackbar(true)
            return
        }

        setCurrentDate(searchDate)
        updateDateInputs(searchDate)
    }

    const getWeekDates = () => {
        const startDate = new Date(currentDate)
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
        return days.map((_, index) => {
            const date = new Date(startDate)
            date.setDate(date.getDate() + index)
            return date
        })
    }

    const renderDateCell = (date) => (
        <TableCell key={date.toISOString()} align="center">
            {days[date.getDay() - 1]}<br />
            {`${date.getMonth() + 1}/${date.getDate()}`}
        </TableCell>
    )

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={onClose}
                closeAfterTransition
            >
=======
    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={onClose} closeAfterTransition>
>>>>>>> Stashed changes
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
<<<<<<< Updated upstream
                        width: '90%',
                        maxWidth: 1000,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        overflow: 'hidden',
                    }}>
                        <IconButton
                            onClick={onClose}
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 4,
                                right: 2,
                            }}
                        >
=======
                        width: '90%', maxWidth: 1000,
                        bgcolor: 'background.paper', boxShadow: 24, p: 4, overflow: 'hidden',
                    }}>
                        <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 4, right: 2 }}>
>>>>>>> Stashed changes
                            <Close />
                        </IconButton>

                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Grid container columnSpacing={2} rowSpacing={2} alignItems="center" sx={{ mb: 2 }}>
<<<<<<< Updated upstream
                                <Grid xs={12} md={3.5} sx={{ ml: 2 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>樓層</InputLabel>
                                        <Select
                                            value={floor}
                                            onChange={handleFloorChange}
                                            label="樓層"
                                        >
                                            <MenuItem value="1">1樓</MenuItem>
                                            <MenuItem value="2">2樓</MenuItem>
                                            <MenuItem value="3">3樓</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} md={3.5} sx={{ ml: 2 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>教室編號</InputLabel>
                                        <Select
                                            value={room}
                                            onChange={handleRoomChange}
                                            label="教室編號"
                                        >
                                            <MenuItem value="101">101</MenuItem>
                                            <MenuItem value="102">102</MenuItem>
                                            <MenuItem value="103">103</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} md={4} sx={{ ml: 6 }}>
                                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                                        <IconButton onClick={handlePrev} size="small">
                                            <ChevronLeft />
                                        </IconButton>
                                        <Typography variant="h6" sx={{ mx: 2 }}>
                                            {`${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`}
                                        </Typography>
                                        <IconButton onClick={handleNext} size="small">
                                            <ChevronRight />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
                                <TextField
                                    label="年"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    size="small"
                                    sx={{ width: 80, mr: 1 }}
                                />
                                <TextField
                                    label="月"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    size="small"
                                    sx={{ width: 60, mr: 1 }}
                                />
                                <TextField
                                    label="日"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    size="small"
                                    sx={{ width: 60, mr: 1 }}
                                />
                                <IconButton onClick={handleSearch}>
                                    <Search />
                                </IconButton>
                            </Box>

                            <TableContainer component={Paper} sx={{ border: '1px solid #e0e0e0' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell></TableCell>
                                            {getWeekDates().map(renderDateCell)}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {timeSlots.map(slot => (
                                            <TableRow key={slot}>
                                                <TableCell component="th" scope="row">{slot}</TableCell>
                                                {days.map((_, index) => (
                                                    <TableCell key={`${slot}-${index}`} align="center"></TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={() => setOpenSnackbar(false)}
                        >
                            <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                                {errorMessage}
                            </Alert>
                        </Snackbar>
=======
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
>>>>>>> Stashed changes
                    </Box>
                </Fade>
            </Modal>
        </ThemeProvider>
    )
}

export default ClassroomStatus
