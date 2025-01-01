import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const UnBanUserButton = ({ user, setReload }) => {
    const { t } = useTranslation();

    const handleUnban = async () => {
        try {
            const response = await axios.patch(`/api/users/${user.email}/unban`);
            if (response.status === 200) {
                alert(t('使用者解禁成功'));
                setReload(true);
            } else if (response.status === 404) {
                console.error(t('未找到使用者'));
                alert(t('未找到使用者'));
            }
        } catch (error) {
            console.error(t('解禁失敗:'), error);
            alert(`${t('解禁失敗')}：${error.response?.data || error.message}`);
        }
    };

    return (
        <Button variant="contained" color="primary" onClick={handleUnban} disabled={!user.isBanned} sx={{ textTransform: "none" }}>
            {t('解禁使用者')}
        </Button>
    );
};

export default UnBanUserButton;
