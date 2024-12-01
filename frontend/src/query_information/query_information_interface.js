import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ComboBox from "./combo_box";
import Strip from "./information_strip";

export default function Query_information_interface() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [Info, setInfo] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/classroom_apply") // 使用查詢所有申請資訊的 API
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("後端回傳的資料:", data);

                
                const uniqueBorrowers = Array.from(
                    new Set(
                        data
                            .map((application) => application.borrower)
                            .filter((borrower) => borrower !== null && borrower !== undefined)
                    )
                ).map((borrower) => ({
                    label: borrower,
                    value: borrower,
                }));

                // 更新 options
                setOptions(uniqueBorrowers);

                // 將後端資料轉換成需要的格式
                const transformedData = data.map((application) => ({
                    user: application.borrower || "未知借用者",
                    classroomId: application.classroom || "未知教室",
                    rentalDate: application.startTime
                        ? new Date(application.startTime).toLocaleDateString()
                        : "未知日期",
                    isRented:
                        application.approved === null || application.approved === undefined
                            ? "尚未審核"
                            : application.approved
                                ? "已出租"
                                : "未出租",
                }));

                setInfo(transformedData); // 更新狀態
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleChange = (event, value) => {
        setSelectedOption(value);
        console.log("選中的值:", value);
    };

    const filteredRentalInfo = Info.filter((item) => {
        if (selectedOption) {
            return item.user === selectedOption.value;
        }
        return true; // 如果沒選擇使用者，顯示所有紀錄
    });

    return (
        <Box
            sx={{
                width: "100%",
                height: "95vh",
            }}
        >
            <Card sx={{ width: "100%", height: "100%" }}>
                <ComboBox
                    sx={{ width: "95%", marginTop: "1%", marginLeft: "2.5%" }}
                    options={options}
                    label="請選擇想調閱的使用者"
                    value={selectedOption}
                    onChange={handleChange}
                />
                <Box
                    sx={{
                        maxHeight: "80vh", // 設定最大高度，根據需要調整
                        overflowY: "auto", // 啟用垂直滾動
                        padding: "1%", // 設定內邊距
                    }}
                >
                    {filteredRentalInfo.map((item, index) => (
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
