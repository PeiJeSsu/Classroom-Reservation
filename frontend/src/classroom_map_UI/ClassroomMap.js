import React, {useState} from 'react';
import {Box} from '@mui/material';
import MapSelectionPanel from './MapSelectionPanel';
import MapDisplay from "./MapDisplay";

export default function ClassroomMap() {
    const [floor, setFloor] = useState(null)

    return (
        <Box>
            <MapSelectionPanel floor={floor} setFloor={setFloor}/>
            <MapDisplay floor={floor} setFloor={setFloor}/>
        </Box>
    );
}

