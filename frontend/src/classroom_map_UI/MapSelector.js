import React from 'react';
import { Box, Card, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MapSelector = ({ floor, setFloor }) => {
    const { t } = useTranslation();

    const handleFloorChange = (event) => {
        setFloor(event.target.value);
    };

    return (
        <FormControl fullWidth sx={{ minWidth: 300 }}>
            <InputLabel id="floor-select-label">{t('樓層選擇')}</InputLabel>
            <Select
                labelId="floor-select-label"
                value={floor}
                onChange={handleFloorChange}
                label={t('樓層選擇')}
            >
                <MenuItem value="B1">{t('B1')}</MenuItem>
                <MenuItem value="1">{t('1樓')}</MenuItem>
                <MenuItem value="2">{t('2樓')}</MenuItem>
                <MenuItem value="3">{t('3樓')}</MenuItem>
                <MenuItem value="4">{t('4樓')}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default MapSelector;
