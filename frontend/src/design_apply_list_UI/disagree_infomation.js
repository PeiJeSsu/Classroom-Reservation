import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function DisagreeInformation({ open, onClose, onSubmit }) {
    const [reason, setReason] = useState(""); // 用於儲存使用者填寫的理由

    const handleSubmit = () => {
        onSubmit(reason); // 傳遞理由到外部
        setReason(""); // 清空輸入框
        onClose(); // 關閉對話框
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={false} // 禁用全寬，啟用自訂寬度
            PaperProps={{
                style: {
                    width: "30%", // 設定寬度為 30%
                },
            }}
        >
            <DialogTitle>{'不同意通知'}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    請填入不同意理由
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="請輸入您的理由"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    取消
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    提交
                </Button>
            </DialogActions>
        </Dialog>
    );
}
