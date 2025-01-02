import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import UserSelector from "../user_isbanned_status_UI/UserSelector";
import { useTranslation } from 'react-i18next';

const KeyStatusSelector = ({ inputKeyStatus, setInputKeyStatus, inputBorrower, setInputBorrower }) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', width: '100%' }}>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="key-status-label">{t('keyStatusSelector.鑰匙狀態')}</InputLabel>
                <Select
                    labelId="key-status-label"
                    label={t('keyStatusSelector.鑰匙狀態')}
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
            <Box sx={{ position: 'relative', width: 300 }}>
                <UserSelector
                    user={inputBorrower}
                    setUser={setInputBorrower}
                    disabled={inputKeyStatus === "AVAILABLE"}
                />
                {inputKeyStatus === "AVAILABLE" && (
                    <Typography sx={{ position: 'absolute', top: '100%', left: 0, color: 'red', fontSize: '0.75rem', mt: 0.5 }}>
                        {t('此狀態下禁止輸入使用者')}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default KeyStatusSelector;
