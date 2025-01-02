import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Grid2 } from '@mui/material';
import FloorAndClassroomCodeSelector from "../floor_and_classroom_code_selection/FloorAndClassroomCodeSelector";
import HistoryDialog from './historyDialog';
import { apiConfig } from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

export default function ApplyList() {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [reload, setReload] = useState(false);
    const [personalInfo, setPersonalInfo] = useState([]);
    const [open, setOpen] = useState(false);
    const [floor, setFloor] = useState('');
    const [classroomCode, setClassroomCode] = useState('');
    const { t, i18n } = useTranslation();

    // Check the language for dynamic styling
    const isChinese = i18n.language === 'zh_tw';
    const styles = {
        classroomIdWidth: isChinese ? "160px" : "180px",
        floorWidth: isChinese ? "110px" : "110px",
        userWidth: isChinese ? "180px" : "200px",
        rentalTimeWidth: isChinese ? "450px" : "460px",
        isRentedWidth: isChinese ? "160px" : "160px",
    };

    useEffect(() => {
        apiConfig
            .get('/api/classroom_apply/pending')
            .then((response) => {
                const sortedApplications = response.data.sort((a, b) => {
                    const floorOrder = ['B1', '1', '2', '3', '4'];
                    if (a.floor !== b.floor) {
                        return floorOrder.indexOf(a.floor) - floorOrder.indexOf(b.floor);
                    }
                    return a.classroom.localeCompare(b.classroom);
                });
                setApplications(sortedApplications);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [reload]);

    useEffect(() => {
        const filtered = applications.filter((app) => {
            const matchesFloor = !floor || app.floor === floor;
            const matchesClassroom = !classroomCode || app.classroom === classroomCode;
            return matchesFloor && matchesClassroom;
        });
        setFilteredApplications(filtered);
    }, [floor, classroomCode, applications]);

    const handleClose = () => {
        setOpen(false);
    };

    const showHistory = (borrower) => {
        apiConfig.get(`/api/classroom_apply/borrower/${borrower}`)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const transformedData = response.data.map((item) => ({
                    user: item.borrower,
                    classroom: item.classroom,
                    rentalDate: new Date(item.startTime).toLocaleDateString(),
                    isRented:
                        item.isApproved === null || item.isApproved === undefined
                            ? t('尚未審核')
                            : item.isApproved
                                ? t('同意')
                                : t('不同意'),
                }));
                setPersonalInfo(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                alert(t('無法加載資料，請稍後再試。'));
            });
        setOpen(true);
    };

    const handleApprove = (id) => {
        apiConfig
            .put(`/api/classroom_apply/${id}/approve`)
            .then(() => {
                setReload((prev) => !prev);
            })
            .catch((error) => {
                console.error('Error approving application:', error);
            });
    };

    const handleDeny = (id, reason) => {
        console.log("Reason:", reason);
        apiConfig
            .put(`/api/classroom_apply/${id}/deny`, { reason })
            .then(() => {
                setReload((prev) => !prev);
            })
            .catch((error) => {
                console.error('Error denying application:', error);
            });
    };

    return (
        <Box>
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
                <Grid2 container justifyContent="space-between">
                    <Grid2 item xs={3}>
                        <FloorAndClassroomCodeSelector
                            floor={floor}
                            setFloor={setFloor}
                            classroomCode={classroomCode}
                            setClassroomCode={setClassroomCode}
                            showAllOption={true}
                            required
                        />
                    </Grid2>
                </Grid2>
            </Paper>
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
                {filteredApplications.length === 0 ? (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}>
                        {t("沒有找到相關的申請，請檢查後端是否已經啟動，並且資料庫中確實存在資料")}
                    </Typography>
                ) : (
                    filteredApplications.map((result) => (
                        <Box
                            key={result.id}
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
                            <Box sx={{display: 'flex', gap: 2}}>
                                <Typography variant="body1" sx={{minWidth: styles.classroomIdWidth}}>{t('教室編號')}: {result.classroom}</Typography>
                                <Typography variant="body1" sx={{minWidth: styles.floorWidth}}>{t('樓層')}: {result.floor}</Typography>
                                <Typography variant="body1" sx={{minWidth: styles.userWidth}}>
                                    {t('借用人')}: {result.borrower ? result.borrower : t('未知使用者')}
                                </Typography>
                                <Typography variant="body1" sx={{minWidth: styles.rentalTimeWidth}}>
                                    {t('借用時間')}: {`${new Date(result.startTime).toLocaleString('zh-TW', { hour12: false })} ${t('到')} ${new Date(result.endTime).toLocaleString('zh-TW', { hour12: false })}`}
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    sx={{marginRight: 4, textTransform: "none"}}
                                    onClick={() => showHistory(result.borrower)}
                                >
                                    {t('檢視歷史紀錄')}
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{marginRight: 4, textTransform: "none"}}
                                    onClick={() => handleApprove(result.id)}
                                >
                                    {t('同意')}
                                </Button>
                                <Button variant="contained" onClick={() => handleDeny(result.id)} sx={{ textTransform: "none" }}>
                                    {t('不同意')}
                                </Button>
                            </Box>
                        </Box>
                    ))
                )}
                <HistoryDialog open={open} onClose={handleClose} title={t("歷史紀錄")}>
                    {personalInfo.length === 0 ? (
                        <Typography>{t('尚無歷史紀錄')}</Typography>
                    ) : (
                        personalInfo.map((info, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '20px',
                                }}
                            >
                                <Typography variant="body1" sx={{minWidth: styles.userWidth}}> {t('借用人')}: {info.user}</Typography>
                                <Typography variant="body1" sx={{minWidth: styles.classroomIdWidth}}> {t('教室編號')}: {info.classroom}</Typography>
                                <Typography variant="body1" sx={{minWidth: '210px'}}> {t('借用日期')}: {info.rentalDate}</Typography>
                                <Typography variant="body1">{t('審查結果')}: {info.isRented}</Typography>
                            </Box>
                        ))
                    )}
                </HistoryDialog>
            </Paper>
        </Box>
    );
}
