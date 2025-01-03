import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';

import TableHeader from './TableHeaderComponent';
import TableBodyComponent from './TableBodyComponent';
import { getWeekRange, getWeekDates, formatDateForApi } from './DateHandler';
import {apiConfig} from "../../config/apiConfig";

function ScheduleTable({ currentDate, selectedFloor, selectedRoomNumber }) {
    const [unavailableSlots, setUnavailableSlots] = useState([]);

    useEffect(() => {
        setUnavailableSlots([]);
        if (selectedFloor && selectedRoomNumber && currentDate) {
            const { start, end } = getWeekRange(currentDate);

            apiConfig.get('/api/classroom_apply/search', {
                params: {
                    floor: selectedFloor,
                    roomNumber: selectedRoomNumber,
                    startTime: formatDateForApi(start),
                    endTime: formatDateForApi(end)
                }
            }).then(response => {
                // console.log("Response Data:", response.data);
                setUnavailableSlots(response.data);
            }).catch(error => {
                console.error('Error fetching schedule:', error);
            });
        }
    }, [currentDate, selectedFloor, selectedRoomNumber]);

    const weekDates = getWeekDates(currentDate);

    return (
        <TableContainer component={Paper} sx={{ border: '1px solid #e0e0e0' }}>
            <Table size="small">
                <TableHead>
                    <TableHeader weekDates={weekDates} />
                </TableHead>
                <TableBody>
                    <TableBodyComponent weekDates={weekDates} unavailableSlots={unavailableSlots} />
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ScheduleTable;