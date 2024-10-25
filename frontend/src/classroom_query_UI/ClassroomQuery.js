import React, {useState} from 'react';
import {Box, Grid2, TextField, Button, Paper, IconButton, Typography} from '@mui/material';
import {Search} from '@mui/icons-material';
import FloorSelector from './FloorSelector';
import ClassroomCodeSelector from './ClassroomCodeSelector';

export default function ClassroomQuery() {
    const [floor, setFloor] = useState('');
    const [classroomCode, setClassroomCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const fakeResults = [
            {id: 1, code: '101', floor: '1'},
            {id: 2, code: '102', floor: '1'},
            {id: 3, code: '201', floor: '2'},
            {id: 4, code: '202', floor: '2'},
            {id: 5, code: 'B101', floor: 'B1'}
        ];
        setResults(fakeResults);
    };

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
                        <TextField
                            fullWidth
                            label="教室代號查詢"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 item xs={1}>
                        <IconButton aria-label="search" onClick={handleSearch}>
                            <Search/>
                        </IconButton>
                    </Grid2>
                </Grid2>
            </Paper>

            {results.length > 0 && (
                <Paper elevation={3} sx={{padding: '20px', marginTop: '20px'}}>
                    {results.map((result) => (
                        <Box
                            key={result.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                            }}
                        >
                            <Box sx={{display: 'flex', gap: 2}}>
                                <Typography variant="body1">教室編號: {result.code}</Typography>
                                <Typography variant="body1">樓層: {result.floor}</Typography>
                            </Box>
                            <Box>
                                <Button variant="contained" sx={{marginRight: 4}}>查看</Button>
                                <Button variant="contained">申請</Button>
                            </Box>
                        </Box>
                    ))}
                </Paper>
            )}
        </Box>
    );
}
