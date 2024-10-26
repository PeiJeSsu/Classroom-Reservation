import React from 'react';
import { TextField } from '@mui/material';

export default function SearchField({ searchQuery, setSearchQuery }) {
    return (
        <TextField
            fullWidth
            label="教室代號查詢"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
}
