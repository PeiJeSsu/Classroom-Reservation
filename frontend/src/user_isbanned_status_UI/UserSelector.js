import React, { useState, useEffect } from 'react';
import {Autocomplete, TextField, Typography} from '@mui/material';

const UserSelector = ({ user, setUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/users/allUsers')
            .then(response => response.json())
            .then(data => {
                const sortedUsers = data.sort((a, b) => {
                    if (a.role !== b.role)
                        return a.role > b.role ? 1 : -1;
                    return a.email.localeCompare(b.email);
                });
                setUsers(sortedUsers);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleUserChange = (event, value) => {
        // console.log('UserSelector', value);
        if (typeof value === 'string')
            setUser({ email: value, role: 'unknown' });
        else if (typeof value === 'object')
            setUser(value);
    };

    return (
        <Autocomplete
            options={users}
            getOptionLabel={(option) => {
                if (typeof option === 'string')
                    return option;
                const emailPart = option.email.split('@')[0];
                return `${emailPart}`;
            }}
            groupBy={(option) => option.role}
            freeSolo
            value={user || null}
            onChange={handleUserChange}
            renderOption={(props, option) => (
                <li {...props}>
                    <Typography sx={{ display: 'inline-block', width: '10ch' }}>
                        {option.email.split('@')[0]}
                    </Typography>
                    {/*<span>({option.role === 'borrower' ? '借用人' : '管理者'})</span>*/}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="請選擇使用者（輸入關鍵字來快速查詢）"
                    variant="outlined"
                />
            )}
            sx={{ minWidth: 350 }}
        />
    );
};

export default UserSelector;
