import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BanUserButton from "./update_isbanned_status/BanUserButton";

export default function UserList({ user, reload, setReload }) {
    const [users, setUsers] = useState([]);
    console.log('UserList', user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('api/users/allUsers');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUsers();

        if (reload) {
            setReload(false);
        }
    }, [reload]);

    const usersToDisplay = user ? users.filter(u => u.email.includes(user.email)) : users;

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            {usersToDisplay.length === 0 ? (
                <Typography variant="body1">沒有找到相關的用戶。</Typography>
            ) : (
                usersToDisplay.map((user) => (
                    <Box
                        key={user.id}
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
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="body1" sx={{ minWidth: '150px' }}>
                                使用者: {user.email.split('@')[0]}
                            </Typography>
                            <Typography variant="body1" sx={{ minWidth: '120px' }}>
                                身分: {user.role === 'borrower' ? '借用人' : '管理者'}
                            </Typography>
                            <Typography variant="body1" sx={{ minWidth: '120px' }}>
                                狀態: {user.isBanned ? '禁用中' : '可用'}
                            </Typography>
                            {user.isBanned && user.unbanTime && (
                                <Typography variant="body1" sx={{ minWidth: '150px' }}>
                                    解禁時間: {user.unbanTime}
                                </Typography>
                            )}
                        </Box>

                        <BanUserButton variant="contained" user={user} setReload={setReload}/>
                    </Box>
                ))
            )}
        </Paper>
    );
}
