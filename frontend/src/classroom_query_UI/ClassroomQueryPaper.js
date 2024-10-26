import React from 'react';
import { Grid2, Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import FloorSelector from './FloorSelector';
import ClassroomCodeSelector from './ClassroomCodeSelector';
import SearchField from "./SearchField";

const ClassroomQueryPaper = ({ floor, setFloor, classroomCode, setClassroomCode, searchQuery, setSearchQuery, onSearch }) => {
    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            <Grid2 container spacing={5}>
                <Grid2 item xs={3}>
                    <FloorSelector floor={floor} setFloor={setFloor} />
                </Grid2>
                <Grid2 item xs={3}>
                    <ClassroomCodeSelector classroomCode={classroomCode} setClassroomCode={setClassroomCode} />
                </Grid2>
                <Grid2 item xs={5}>
                    <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Grid2>
                <Grid2 item xs={1}>
                    <IconButton aria-label="search" onClick={onSearch}>
                        <Search />
                    </IconButton>
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default ClassroomQueryPaper;
