import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import axios from 'axios';

export default function ResultList({ floor, classroomCode, searchQuery }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/classroom_build/search`, {
                    params: { floor, classroomCode, searchQuery }
                });
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setResults([]);
            }
        };

        handleSearch();
    }, [floor, classroomCode, searchQuery]);

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            {results.length > 0 ? (
                results.map((result) => (
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
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Typography variant="body1">教室編號: {result.roomNumber}</Typography>
                            <Typography variant="body1">樓層: {result.floor}</Typography>
                        </Box>
                        <Box>
                            <Button variant="contained" sx={{ marginRight: 4 }}>查看</Button>
                            <Button variant="contained">申請</Button>
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', padding: '10px' }}>
                    沒有找到任何結果
                </Typography>
            )}
        </Paper>
    );
}
