import React from 'react';
import {Grid2, Paper, Typography} from '@mui/material';
import UserSelector from "./UserSelector";

const UserSelectionPanel = ({user, setUser}) => {
    // console.log('UserSelectionPanel', user);

    return (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            <Grid2 container spacing={5}>
                <Grid2 item xs={3}>
                    <Typography variant="h6" sx={{marginBottom: "10px"}}>
                        選擇使用者
                    </Typography>
                    <UserSelector user={user} setUser={setUser} disabled={false}></UserSelector>
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default UserSelectionPanel;
