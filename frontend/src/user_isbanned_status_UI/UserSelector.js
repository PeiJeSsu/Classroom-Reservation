import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { apiConfig } from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

const UserSelector = ({ user, setUser, disabled }) => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState(''); 

    useEffect(() => {
        apiConfig.get('/api/users/allUsers')
            .then(response => {
                const sortedUsers = response.data.sort((a, b) => {
                    if (a.role !== b.role) return a.role > b.role ? 1 : -1;
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
        } else if (value === null || value.trim() === '') {
            setUser({
                email: '',
                role: 'unknown',
                isBanned: false,
                unbanTime: null,
            });
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

    const handleInputChange = (event, value) => {
        setInputValue(value);
    };

    const handleInputBlur = (event) => {
        handleValueUpdate(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() === '') {
            setUser({
                email: '',
                role: 'unknown',
                isBanned: false,
                unbanTime: null,
            });
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.split('@')[0].includes(inputValue)
    );

    return (
        <Autocomplete
            options={filteredUsers}
            getOptionLabel={(option) => {
                if (typeof option === 'string')
                    return option;
                return option.email.split('@')[0];
            }}
            groupBy={(option) => option.role}
            freeSolo
            value={null}
            onChange={handleUserChange}
            onInputChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            inputValue={inputValue}
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
                />
            )}
            sx={{ minWidth: 300 }}
            disabled={disabled}
        />
    );
};

export default UserSelector;
