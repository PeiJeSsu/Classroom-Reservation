import React from 'react';
import {Box, Typography, Paper, Button} from '@mui/material';

export default function ResultList() {
    const sampleResults = [
        {id: 1, code: '101', floor: '1'},
        {id: 2, code: '102', floor: '1'},
        {id: 3, code: '201', floor: '2'},
        {id: 4, code: '202', floor: '2'},
        {id: 5, code: 'B101', floor: 'B1'}
    ];

    return (
        <Paper elevation={3} sx={{padding: '20px', marginTop: '20px'}}>
            {sampleResults.map((result) => (
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
    );
}
