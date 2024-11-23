import React from 'react';
import {FormControl, InputLabel, Select, MenuItem, TextField, Box} from '@mui/material';

const KeyStatusSelector = ({ inputKeyStatus, setInputKeyStatus, inputBorrower, setInputBorrower }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', width: '100%' }}>
            <FormControl sx={{ width: 150 }}>
                <InputLabel id="key-status-label">鑰匙狀態</InputLabel>
                <Select
                    labelId="key-status-label"
                    label="鑰匙狀態"
                    value={inputKeyStatus}
                    onChange={(e) => {
                        const newStatus = e.target.value;
                        setInputKeyStatus(newStatus);
                        if (newStatus === "AVAILABLE") {
                            setInputBorrower(null);
                        }
                    }}
                >
                    <MenuItem value="BORROWED">BORROWED</MenuItem>
                    <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                    <MenuItem value="LOST">LOST</MenuItem>
                </Select>
            </FormControl>
            <TextField
                sx={{ width: 150 }}
                label="借用者"
                value={inputBorrower || ''}
                onChange={(e) => setInputBorrower(e.target.value)}
                disabled={inputKeyStatus === "AVAILABLE"}
                helperText={inputKeyStatus === "AVAILABLE" ? "此狀態禁止輸入" : ""}
            />
        </Box>
    );
};

export default KeyStatusSelector;
