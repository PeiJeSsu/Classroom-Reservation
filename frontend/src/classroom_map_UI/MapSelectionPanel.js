import React from 'react';
import { Grid2, Paper } from '@mui/material';
import MapSelector from "./MapSelector";

const MapSelectionPanel = ({floor, setFloor}) => {

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            <Grid2 container spacing={5}>
                <Grid2 item xs={3}>
                    <MapSelector floor={floor} setFloor={setFloor} ></MapSelector>
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default MapSelectionPanel;
