import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';

import CustomTabPanel from './CustomTabPanel';
import ClassroomQuery from "../classroom_query_UI/ClassroomQuery";
import ApplyList from "../design_apply_list_UI/ApplyList";
import Logout from "../login/Logout";
import Information from "../query_information/query_information_interface";
import Personal_Info from "../query_information/personal_informaion";
import UserIsBannedStatus from "../user_isbanned_status_UI/UserIsBannedStatus";
import {FormControl, InputLabel} from "@mui/material";
import MapSelectionPanel from "../classroom_map_UI/MapSelectionPanel";
import ClassroomMap from "../classroom_map_UI/ClassroomMap";

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const userRole = localStorage.getItem("userRole");
    const { t, i18n } = useTranslation();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const toggleLanguage = () => {
        const currentLang = i18n.language;
        const newLang = currentLang === "en" ? "zh_tw" : "en";
        i18n.changeLanguage(newLang);
        localStorage.setItem("language", newLang);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} sx={{ flexGrow: 1 }}>
                    <Tab label={t("查詢教室")} {...a11yProps(0)} sx={{ textTransform: 'none' }} />
                    {userRole !== "borrower" && <Tab label={t("申請管理")} {...a11yProps(1)} sx={{ textTransform: 'none' }} />}
                    {userRole !== "borrower" && <Tab label={t("使用者狀態管理")} {...a11yProps(2)} sx={{ textTransform: 'none' }} />}
                    <Tab label={t("教室地圖")} {...a11yProps(userRole !== "borrower" ? 3 : 1)} sx={{ textTransform: 'none' }} />
                    <Tab label={t("資訊查詢")} {...a11yProps(userRole !== "borrower" ? 4 : 2)} sx={{ textTransform: 'none' }} />
                </Tabs>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl variant="outlined" sx={{ minWidth: 170, marginTop: 0.8}}>
                        <InputLabel id="language-label">{t('選擇系統語言')}</InputLabel>
                        <Select
                            labelId="language-label"
                            value={i18n.language}
                            onChange={toggleLanguage}
                            label={t('選擇系統語言')}
                            sx={{ height: 35}}
                        >
                            <MenuItem value="en">{t('English')}</MenuItem>
                            <MenuItem value="zh_tw">{t('繁體中文')}</MenuItem>
                        </Select>
                    </FormControl>

                    <Logout />
                </Box>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <ClassroomQuery />
            </CustomTabPanel>

            {userRole !== "borrower" && (
                <CustomTabPanel value={value} index={1}>
                    <ApplyList />
                </CustomTabPanel>
            )}

            {userRole !== "borrower" && (
                <CustomTabPanel value={value} index={2}>
                    <UserIsBannedStatus />
                </CustomTabPanel>
            )}

            <CustomTabPanel
                value={value}
                index={userRole !== "borrower" ? 3 : 1}
            >
                <ClassroomMap />
            </CustomTabPanel>

            <CustomTabPanel
                value={value}
                index={userRole !== "borrower" ? 4 : 2}
            >
                {userRole === "borrower" ? <Personal_Info /> : <Information />}
            </CustomTabPanel>
        </Box>
    );
}
