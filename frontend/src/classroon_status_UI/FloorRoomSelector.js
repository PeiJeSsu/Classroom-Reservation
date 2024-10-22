import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material'

function FloorRoomSelector({ floor, setFloor, room, setRoom }) {
    return (
        <>
            <Grid xs={12} md={3.5} sx={{ ml: 2 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>樓層</InputLabel>
                    <Select value={floor} onChange={(event) => setFloor(event.target.value)} label="樓層">
                        <MenuItem value="1">1樓</MenuItem>
                        <MenuItem value="2">2樓</MenuItem>
                        <MenuItem value="3">3樓</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={12} md={3.5} sx={{ ml: 2 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>教室編號</InputLabel>
                    <Select value={room} onChange={(event) => setRoom(event.target.value)} label="教室編號">
                        <MenuItem value="101">101</MenuItem>
                        <MenuItem value="102">102</MenuItem>
                        <MenuItem value="103">103</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </>
    )
}

export default FloorRoomSelector
