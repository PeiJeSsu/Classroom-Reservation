import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

export default function ClassroomCodeSelector({ floor, classroomCode, setClassroomCode }) {
    const [classroomCodes, setClassroomCodes] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (floor) {
            apiConfig.get(`/classroom_build/floor/${floor}`)
                .then((response) => response.data)
                .then((data) => {
                    const codes = data.map((classroom) => classroom.roomNumber);
                    setClassroomCodes(['全部', ...codes]);
                })
                .catch((error) => {
                    console.error('Error fetching classrooms:', error);
                });
        } else {
            setClassroomCodes(['全部']);
        }
    }, [floor]);

    const handleChange = (event) => {
        const value = event.target.value;
        setClassroomCode(value === '全部' ? null : value);
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="classroom-code-label">{t('classroomCodeSelector.教室編號')}</InputLabel>
            <Select
                labelId="classroom-code-label"
                value={classroomCode === null ? '全部' : classroomCode}
                onChange={handleChange}
                label={t('classroomCodeSelector.教室編號')}
            >
                {classroomCodes.map((code) => (
                    <MenuItem key={code} value={code}>
                        {code === '全部' ? t('全部') : code}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
