import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Strip from "./information_strip";

export default function Personal_information(){
    const personalInfo = [
        { user:"eilo",classroomId: "101", rentalDate: "2024-12-01", isRented: true },
        { user:"eilo",classroomId: "202", rentalDate: "2024-12-05", isRented: false },
        { user:"eilo",classroomId: "303", rentalDate: "2024-12-10", isRented: true },
        { user:"elio",classroomId: "403", rentalDate: "2023-11-10", isRented: true },
        { user:"eilo",classroomId: "303", rentalDate: "2023-11-10", isRented: true },
        { user:"eilo",classroomId: "503", rentalDate: "2023-11-10", isRented: false },
    ];
    return (
        <Box
            sx={{
                width:'100%',

                height:'95vh'
            }}
        >
            <Card sx={{ width: '100%', height: '100%' }}>
                <Box
                    sx={{
                        maxHeight: '80vh',  // 設定最大高度，根據需要調整
                        overflowY: 'auto',  // 啟用垂直滾動
                        padding: '1%',  // 設定內邊距
                    }}
                >
                    {personalInfo.map((item, index) => (
                        <Strip
                            key={index}
                            user={item.user}
                            classroomId={item.classroomId}
                            rentalDate={item.rentalDate}
                            isRented={item.isRented}
                        />
                    ))}
                </Box>
            </Card>
        </Box>
    );
}