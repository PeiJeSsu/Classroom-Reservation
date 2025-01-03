import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

const DisplayIsBanned = ({ userEmail, isBanned, setIsBanned, displayReload, setDisplayReload }) => {
    const [unbanTime, setUnbanTime] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await apiConfig.get(`/api/users/${userEmail}`);
                if (response.status === 200) {
                    const { isBanned, unbanTime } = response.data;
                    setIsBanned(isBanned);
                    setUnbanTime(unbanTime);
                    // console.log(isBanned, unbanTime);
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        if (userEmail) {
            fetchUserStatus();
        }
        if (displayReload)
            setDisplayReload(false);
    }, [userEmail, setIsBanned, displayReload]);

    const formatUnbanTime = (timeString) => {
        const date = new Date(new Date(timeString).getTime() + 8 * 60 * 60 * 1000)
        return date.toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    if (isBanned === null) {
        return;
    }

    return (
        <Alert severity={isBanned ? 'error' : 'success'} sx={{ textTransform: "none" }}>
            {isBanned
                ? t('帳號禁用中，無法使用申請功能。 解禁時間：{{unbanTime}}', { unbanTime: formatUnbanTime(unbanTime) })
                : t('帳號未被禁用，可以使用申請功能')
            }
        </Alert>
    );
};

export default DisplayIsBanned;
