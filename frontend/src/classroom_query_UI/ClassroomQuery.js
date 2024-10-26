import React, {useState} from 'react';
import {Box, Grid2, TextField, Button, Paper, IconButton, Typography} from '@mui/material';
import {Search} from '@mui/icons-material';
import FloorSelector from './FloorSelector';
import ClassroomCodeSelector from './ClassroomCodeSelector';
import SearchField from "./SearchField";
import ResultList from "./ResultList";

export default function ClassroomQuery() {
    const [floor, setFloor] = useState('');
    const [classroomCode, setClassroomCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Box>
            <Paper elevation={3} sx={{padding: '20px', marginTop: '20px'}}>
                <Grid2 container spacing={5}>
                    <Grid2 item xs={3}>
                        <FloorSelector floor={floor} setFloor={setFloor}/>
                    </Grid2>
                    <Grid2 item xs={3}>
                        <ClassroomCodeSelector classroomCode={classroomCode} setClassroomCode={setClassroomCode}/>
                    </Grid2>
                    <Grid2 item xs={5}>
                        <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    </Grid2>
                    <Grid2 item xs={1}>
                        <IconButton aria-label="search" >
                            <Search/>
                        </IconButton>
                    </Grid2>
                </Grid2>
            </Paper>
            <ResultList/>
        </Box>
    );
}
