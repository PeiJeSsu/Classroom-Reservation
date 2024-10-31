import React from 'react';
import { Grid2, Paper} from '@mui/material';
import FloorSelector from './FloorSelector';
import ClassroomCodeSelector from './ClassroomCodeSelector';
import SearchField from "./SearchField";

const ClassroomQueryPaper = ({ floor, setFloor, classroomCode, setClassroomCode, searchQuery, setSearchQuery}) => {
    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            <Grid2 container spacing={3}>
                <Grid2 item xs={3}>
                    <FloorSelector floor={floor} setFloor={setFloor} setSearchQuery={setSearchQuery}/>
                </Grid2>
                <Grid2 item xs={3}>
                    <ClassroomCodeSelector classroomCode={classroomCode} setClassroomCode={setClassroomCode} floor={floor} setSearchQuery={setSearchQuery}/>
                </Grid2>
                <Grid2 item xs={6}>
                    <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default ClassroomQueryPaper;
