import React, {useEffect, useState} from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import axios from 'axios'

const days = ['星期一', '星期二', '星期三', '星期四', '星期五']
const timeSlots = [
    '08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00',
    '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00', '15:00 ~ 16:00',
    '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '19:00 ~ 20:00'
]

function ScheduleTable({currentDate, selectedFloor, selectedRoomNumber}) {
    const [unavailableSlots, setUnavailableSlots] = useState([])

    useEffect(() => {
        setUnavailableSlots([]);
        if (selectedFloor && selectedRoomNumber && currentDate) {
            const {start, end} = getWeekRange(currentDate)

            axios.get('/api/classroom_apply/search', {
                params: {
                    floor: selectedFloor,
                    roomNumber: selectedRoomNumber,
                    startTime: formatDateForApi(start),
                    endTime: formatDateForApi(end)
                }
            }).then(response => {
                console.log("Response Data:", response.data);
                setUnavailableSlots(response.data);
                //console.log("UnavailableSlots", unavailableSlots);
            }).catch(error => {
                console.error('Error fetching schedule:', error);
            });
        }
    }, [currentDate, selectedFloor, selectedRoomNumber])

    const getWeekRange = (currentDate) => {
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 4);
        endDate.setHours(23, 59, 59, 999);

        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        return {start: startDate, end: endDate};
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

    const formatDateForApi = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // console.log("Format Date:", `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }


    const renderDateCell = (date) => (
        <TableCell key={date.toISOString()} align="center">
            {days[date.getDay() - 1]}<br/>
            {`${date.getMonth() + 1}/${date.getDate()}`}
        </TableCell>
    )

    const isSlotUnavailable = (date, slot) => {
        const startTime = new Date(`${date.toISOString().split('T')[0]}T${slot.split(' ~ ')[0]}:00+08:00`);
        const endTime = new Date(`${date.toISOString().split('T')[0]}T${slot.split(' ~ ')[1]}:00+08:00`);

        console.log('Test:', date, 'to', slot, 'to', startTime, 'to', endTime);
        return unavailableSlots.some(unavailable => {
            const unavailableStart = new Date(unavailable.startTime);
            const unavailableEnd = new Date(unavailable.endTime);
            return (((startTime >= unavailableStart && startTime < unavailableEnd) ||
                    (endTime > unavailableStart && endTime <= unavailableEnd)) &&
                unavailable.approved === true);
        });
    }


    return (
        <TableContainer component={Paper} sx={{border: '1px solid #e0e0e0'}}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#f5f5f5'}}>
                        <TableCell></TableCell>
                        {getWeekDates().map(renderDateCell)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeSlots.map(slot => (
                        <TableRow key={slot}>
                            <TableCell component="th" scope="row">{slot}</TableCell>
                            {getWeekDates().map(date => (
                                <TableCell
                                    key={`${slot}-${new Date(date.getTime() + (8 * 60 * 60 * 1000)).toISOString()}`}
                                    align="center">
                                    {isSlotUnavailable(new Date(date.getTime() + (8 * 60 * 60 * 1000)), slot) ? 'X' : ''}
                                </TableCell>

                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ScheduleTable
