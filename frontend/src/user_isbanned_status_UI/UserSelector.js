import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const UserSelector = ({ user, setUser, disabled }) => {
    const { t } = useTranslation();
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

    const handleValueUpdate = (value) => {
        if (typeof value === 'object' && value !== null) {
            setUser(value);
        } else if (typeof value === 'string') {
            const matchedUser = users.find(user => user.email.split('@')[0] === value);
            if (matchedUser) {
                setUser(matchedUser);
            } else {
                setUser({
                    email: value,
                    role: 'unknown',
                    isBanned: false,
                    unbanTime: null,
                });
            }
        }
    };

    const handleUserChange = (event, value) => {
        handleValueUpdate(value);
    };

    const handleInputBlur = (event) => {
        handleValueUpdate(event.target.value);
    };

    return (
        <Autocomplete
            options={users}
            getOptionLabel={(option) => {
                if (typeof option === 'string')
                    return option;
                return option.email.split('@')[0];
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
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t("請選擇使用者（輸入關鍵字查詢）")}
                    variant="outlined"
                    onBlur={handleInputBlur}
                />
            )}
            sx={{ minWidth: 300 }}
            disabled={disabled}
        />
    );
};

export default UserSelector;
