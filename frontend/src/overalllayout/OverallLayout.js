import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from './CustomTabPanel';
import ClassroomQuery from "../classroom_query_UI/ClassroomQuery";
import ApplyList from "../design_apply_list_UI/ApplyList";
import Classroom_map from "../classroom_map_UI/Classroom_map";
export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="查詢教室" {...a11yProps(0)} />
                    <Tab label="申請管理" {...a11yProps(1)} />
                    <Tab label="教室地圖" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ClassroomQuery />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ApplyList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Classroom_map/>
            </CustomTabPanel>
        </Box>
    );
}