import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const UnbanClassroomButton = ({ initialClassroomCode, isBanned, setReload }) => {
    const { t } = useTranslation();

    const handleUnban = async () => {
        try {
            const response = await axios.patch(`/classroom_build/${initialClassroomCode}/unban`);
            if (response.status === 200) {
                alert(t('教室解禁成功'));
                setReload(true);
            } else if (response.status === 404) {
                console.error(t('未找到教室'));
                alert(t('未找到教室'));
            }
        } catch (error) {
            console.error(t('解禁失敗:'), error);
            alert(`${t('解禁失敗：')}${error.response?.data || error.message}`);
        }
    };

    return (
        <Button variant="contained" onClick={handleUnban} disabled={!isBanned} sx={{ textTransform: "none" }}>
            {t('解禁教室')}
        </Button>
    );
};

export default UnbanClassroomButton;
