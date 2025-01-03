import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BanUserButton from "./update_isbanned_status/BanUserButton";
import UnBanUserButton from "./update_isbanned_status/UnBanUserButton";
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

export default function UserList({ user, reload, setReload }) {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiConfig.get('/api/users/allUsers');
                if (response.status !== 200) throw new Error('Network response was not ok');
                const data = await response.data;
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

    const usersToDisplay = user ? users.filter(u => u.email.split('@')[0].includes(user.email.split('@')[0])) : users;

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            {usersToDisplay.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}>
                    {t("沒有找到相關的使用者，請檢查後端是否已經啟動，並且資料庫中確實存在資料")}
                </Typography>
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
                            <Typography variant="body1" sx={{ minWidth: '185px' }}>
                                {t('使用者')}: {user.email.split('@')[0]}
                            </Typography>
                            <Typography variant="body1" sx={{ minWidth: '140px' }}>
                                {t('身分')}: {user.role === 'borrower' ? t('借用人') : t('管理者')}
                            </Typography>
                            <Typography variant="body1" sx={{ minWidth: '140px' }}>
                                {t('狀態')}: {user.isBanned ? t('禁用中') : t('可用')}
                            </Typography>
                            {user.isBanned && user.unbanTime && (
                                <Typography variant="body1" sx={{ minWidth: '140px' }}>
                                    {t('解禁時間')}: {
                                    new Date(new Date(user.unbanTime).getTime() + 8 * 60 * 60 * 1000).toLocaleString('zh-TW', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false
                                    })
                                }
                                </Typography>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <UnBanUserButton variant="contained" user={user} setReload={setReload}/>
                            <BanUserButton variant="contained" user={user} setReload={setReload}/>
                        </Box>
                    </Box>
                ))
            )}
        </Paper>
    );
}
