import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Strip from "./information_strip";

export default function Personal_information() {
    const [personalInfo, setPersonalInfo] = useState([]);

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        console.log("Logged in userName: ", userName);

        if (userName) {

            fetch(`http://localhost:8080/api/classroom_apply/borrower/${userName}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    const transformedData = data.map((item) => {
                        console.log("後端傳回的完整資料: ", data);
                        return {
                            user: item.borrower,
                            classroom: item.classroom,
                            rentalDate: new Date(item.startTime).toLocaleString(),
                            endtime: new Date(item.endTime).toLocaleString(),
                            isRented: item.isApproved === null || item.isApproved === undefined
                                ? "尚未審核"
                                : item.isApproved ? "已出租" : "未出租",
                            denyReason: item.denyReason || null,
                            floor:item.floor
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
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    padding: '1%',
                }}>
                    {personalInfo.map((item, index) => (
                        <Strip
                            key={index}
                            user={item.user}
                            classroomId={item.classroom}
                            rentalDate={item.rentalDate}
                            isRented={item.isRented}
                            denyReason={item.denyReason}
                            floor={item.floor}
                            endTime={item.endtime}
                        />
                    ))}
                </Box>
            </Card>
        </Box>
    );
}
