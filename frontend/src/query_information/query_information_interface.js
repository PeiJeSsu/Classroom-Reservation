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
        fetch("http://localhost:8080/api/classroom_apply")
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

                setOptions(uniqueBorrowers);

                const transformedData = data.map((application) => ({
                    user: application.borrower || "未知借用者",
                    classroomId: application.classroom || "未知教室",
                    rentalDate: application.startTime
                        ? new Date(application.startTime).toLocaleDateString()
                        : "未知日期",
                    isRented:
                        application.isApproved === null || application.isApproved === undefined
                            ? "尚未審核"
                            : application.isApproved
                                ? "已出租"
                                : "未出租",
                    denyReason: application.denyReason || null,
                }));

                setInfo(transformedData);
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
            const inputValue = selectedOption.value || selectedOption.label || selectedOption;
            return item.user.toLowerCase().includes(inputValue.toLowerCase());
        }
        return true;
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
                    sx={{ width: "25%", marginTop: "1%", marginLeft: "2.5%" }}
                    options={options}
                    label="請選擇想調閱的使用者"
                    value={selectedOption}
                    onChange={handleChange}
                />
                <Box
                    sx={{
                        maxHeight: "80vh",
                        overflowY: "auto",
                        padding: "1%",
                    }}
                >
                    {filteredRentalInfo.map((item, index) => (
                        <Strip
                            key={index}
                            user={item.user}
                            classroomId={item.classroomId}
                            rentalDate={item.rentalDate}
                            isRented={item.isRented}
                            denyReason={item.denyReason}
                        />
                    ))}
                </Box>
            </Card>
        </Box>
    );
}
