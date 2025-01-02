import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';  // 引入 useTranslation

export default function FloorSelector({ floor, setFloor, setClassroomCode }) {
    const [floors, setFloors] = useState([]);
    const { t } = useTranslation();  // 宣告 t 以便使用翻譯

    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const response = await apiConfig.get('/classroom_build/floors');
                const data = await response.data;
                setFloors(['全部', ...data]);
            } catch (error) {
                console.error('Error fetching floors:', error);
            }
        };
        fetchFloors();
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setFloor(value === '全部' ? null : value);
        setClassroomCode(null);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="floor-label">{t('樓層')}</InputLabel>
            <Select
                labelId="floor-label"
                value={floor === null ? '全部' : floor}
                onChange={handleChange}
                label={t('樓層')}
            >
                {floors.map((floorValue) => (
                    <MenuItem key={floorValue} value={floorValue}>
                        {floorValue === '全部' ? t('全部') : floorValue}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
