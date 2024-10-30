import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
const Makechoice = ({ onClose }) => {  
  const [firstDateTime, setFirstDateTime] = useState(dayjs());
  const [secondDateTime, setSecondDateTime] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // 水平居中
          alignItems: 'center', // 垂直居中
          height: '100vh', // 設定盒子高度為視窗高度
        }}
      >
        <Card
          variant="outlined"
          sx={{
            position: 'relative',
            width: '30%', // 寬度為30%
            height: '50%', // 高度為50%
            border: '2px solid', // 邊框粗細
            borderColor: 'grey.500', // 邊框顏色
            display: 'flex',
            flexDirection: 'column', // 垂直排列
            justifyContent: 'flex-end', // 讓內容靠下
          }}
        >
          <IconButton
            aria-label="close"
            sx={{
              position: 'absolute',
              top: "8px", // 從上方的距離
              right: "8px", // 從右邊的距離
              width:"5%",
              color: 'black', // 按鈕顏色
            }}
            onClick={onClose} // 你可以在此加入關閉邏輯
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ 
              marginBottom: '15%', // 讓這個區域距離卡片上方15%
              position :'relative', // 讓樓層和選單在同一行
              top:'5%',
              marginLeft:"10px",
              width: '75%' // 讓Box寬度為100%
          }}>
            <Typography   component="div" gutterBottom sx={{
              position:"relative",
              top:"15%",
              fontSize:"18px",
                marginLeft:"1.5%"
            }}>
              樓層
            </Typography>
            <TextField
              label="選擇樓層"
              select
              fullWidth
              variant="outlined"
              sx={{
                position:"relative",
                marginTop: '10px', // 增加樓層文字和選單之間的距離
                top:"10%",
                width:"125%",
                marginLeft:"1.5%"
              }}
            >
              {/* 樓層選項可以在此加入 */}
            </TextField>
            <Typography   component="div" gutterBottom sx={{
              position:"relative",
              top:"20%",
              fontSize:"18px",
                marginLeft:"1.5%"
            }}>
              教室編號:
            </Typography>
            <TextField
              label="選擇教室編號"
              select
              fullWidth
              variant="outlined"
              sx={{
                position:"relative",
                marginTop: '10px', // 增加樓層文字和選單之間的距離
                top:"17.5%",
                width:"125%",
                marginLeft:"1.5%"
              }}
            >
              {/* 樓層選項可以在此加入 */}
            </TextField>
          </Box>
          <CardContent sx={{ 
              display: 'flex',
              gap: 2, // 元素之間的間距
          }}>
            
            <DateTimePicker sx={{
               
              width:"50%"
            }}
              label="選擇開始時間"
              value={firstDateTime}
              onChange={(newValue) => setFirstDateTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DateTimePicker sx={{
              width:"50%"
            }}
              label="選擇結束時間"
              value={secondDateTime}
              onChange={(newValue) => setSecondDateTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" color="primary" sx={{ width: '20%' }}>
              提交
            </Button>
          </CardActions>
        </Card>
      </Box>
    </LocalizationProvider>
  );
}

export default Makechoice;