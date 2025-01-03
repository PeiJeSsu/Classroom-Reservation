import React from 'react'
import { Box, TextField, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

function SearchField({ year, setYear, month, setMonth, day, setDay, setErrorMessage, setOpenSnackbar, setCurrentDate }) {
    const { t } = useTranslation();
    const handleSearch = () => {
        const searchDate = new Date(`${year}-${month}-${day}`)
        if (isNaN(searchDate.getTime())) {
            setErrorMessage(t('請輸入有效的日期格式'))
            setOpenSnackbar(true)
            setTimeout(() => {
                setErrorMessage(t('請輸入有效的日期格式'));
                setOpenSnackbar(true);
            }, 100);
            return
        }
        setCurrentDate(searchDate)
    }

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
            <TextField
                label={t('searchField.年')}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                size="small"
                sx={{ width: 80, mr: 1 }}
            />
            <TextField
                label={t('searchField.月')}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                size="small"
                sx={{ width: 60, mr: 1 }}
            />
            <TextField
                label={t('searchField.日')}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                size="small"
                sx={{ width: 60, mr: 1 }}
            />
            <IconButton onClick={handleSearch}>
                <Search />
            </IconButton>
        </Box>
    )
}

export default SearchField
