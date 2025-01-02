import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';

const days = ['星期一', '星期二', '星期三', '星期四', '星期五'];

const TableHeaderComponent = ({ weekDates }) => {
    const { t } = useTranslation();

    return (
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell></TableCell>
            {weekDates.map(date => (
                <TableCell key={date.toISOString()} align="center">
                    {t(days[date.getDay() - 1])}<br />
                    {`${date.getMonth() + 1}/${date.getDate()}`}
                </TableCell>
            ))}
        </TableRow>
    );
};

export default TableHeaderComponent;
