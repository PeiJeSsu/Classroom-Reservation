import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const days = ['星期一', '星期二', '星期三', '星期四', '星期五']
const timeSlots = [
    '08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00',
    '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00', '15:00 ~ 16:00',
    '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '19:00 ~ 20:00'
]

function ScheduleTable({ currentDate }) {
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
    )
}

export default ScheduleTable


