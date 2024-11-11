import React from 'react';
import { Grid2, Paper } from '@mui/material';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";

const ClassroomQueryPaper = ({ floor, setFloor, classroomCode, setClassroomCode }) => {
    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            <Grid2 container spacing={5}>
                <Grid2 item xs={3}>
                    <FloorAndClassroomCodeSelector  floor={floor} setFloor={setFloor} classroomCode={classroomCode} setClassroomCode={setClassroomCode} />
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default ClassroomQueryPaper;
