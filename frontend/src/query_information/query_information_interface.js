import React, {useState, useEffect} from "react";
import {Box, Typography} from "@mui/material";
import ComboBox from "./combo_box";
import Strip from "./information_strip";
import {Paper} from '@mui/material';
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

export default function Query_information_interface() {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(null);
    const [Info, setInfo] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        apiConfig.get("api/classroom_apply")
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Network response was not ok");
                }
                return response.data;
            })
            .then((data) => {
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
                    user: application.borrower || t("未知使用者"),
                    classroomId: application.classroom || t("未知教室"),
                    rentalDate: application.startTime
                        ? new Date(application.startTime).toLocaleString('zh-TW', { hour12: false })
                        : t("未知日期"),
                    isRented:
                        application.isApproved === null || application.isApproved === undefined
                            ? t("尚未審核")
                            : application.isApproved
                                ? t("同意")
                                : t("不同意"),
                    floor: application.floor,
                    endTime: application.endTime
                        ? new Date(application.endTime).toLocaleString('zh-TW', { hour12: false })
                        : t("未知結束時間"),

                }));

                setInfo(transformedData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [t]);

    const handleChange = (event, value) => {
        setSelectedOption(value);
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
                marginTop: "20px",
                backgroundColor: "transparent",
            }}
        >
            <Paper elevation={3}>
                <Box
                    sx={{
                        marginBottom: "20px",
                        padding: "20px",

                    }}
                >
                    <ComboBox
                        sx={{ width: "20%" }}
                        options={options}
                        label={t("請選擇使用者（輸入關鍵字查詢）")}
                        value={selectedOption}
                        onChange={handleChange}
                    />
                </Box>
            </Paper>

            <Paper elevation={3}>
                <Box sx={{ padding: "20px" }}>
                    <Box
                        sx={{
                            maxHeight: "70vh",
                            overflowY: "auto",
                        }}
                    >
                        {filteredRentalInfo.length > 0 ? (
                            filteredRentalInfo.map((item, index) => (
                                <Strip
                                    key={index}
                                    user={item.user}
                                    classroomId={item.classroomId}
                                    rentalDate={item.rentalDate}
                                    isRented={item.isRented}
                                    denyReason={item.denyReason}
                                    floor={item.floor}
                                    endTime={item.endTime}
                                />
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}>
                                {t("沒有找到相關的使用者資訊，請檢查後端是否已經啟動，並且資料庫中確實存在資料")}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
