import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Strip from "./information_strip";

export default function Personal_information() {
    const [personalInfo, setPersonalInfo] = useState([]);

    useEffect(() => {
        const userName = localStorage.getItem('userName'); // 獲取 localStorage 中的 userName
        console.log("Logged in userName: ", userName);

        if (userName) {
            // 根據 userName 查詢該借用者的所有資料
            fetch(`http://localhost:8080/api/classroom_apply/borrower/${userName}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    // 將後端資料轉換成需要的格式

                    const transformedData = data.map((item) => {
                        
                        return {
                            user: item.borrower,
                            classroom: item.classroom,
                            rentalDate: new Date(item.startTime).toLocaleDateString(),
                            isRented: item.approved === null || item.approved === undefined
                                ? "尚未審核"
                                : item.approved ? "已出租" : "未出租", // 根據 isApproved 設定狀態
                        };
                    });
                    setPersonalInfo(transformedData);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    alert("無法加載資料，請稍後再試。");
                });
        }
    }, []);

    return (
        <Box sx={{ width: '100%', height: '95vh' }}>
            <Card sx={{ width: '100%', height: '100%' }}>
                <Box sx={{
                    maxHeight: '80vh', // 設定最大高度，根據需要調整
                    overflowY: 'auto', // 啟用垂直滾動
                    padding: '1%', // 設定內邊距
                }}>
                    {personalInfo.map((item, index) => (
                        <Strip
                            key={index}
                            user={item.user}
                            classroomId={item.classroom}
                            rentalDate={item.rentalDate}
                            isRented={item.isRented}
                        />
                    ))}
                </Box>
            </Card>
        </Box>
    );
}
