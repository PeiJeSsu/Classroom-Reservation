import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ComboBox from "./combo_box";
import Strip from "./information_strip";
export default function Query_information_interface() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (event, value) => {
        setSelectedOption(value);
        console.log("選中的值:", value);
    };
    const options = [
        { label: "justin", value: "justin" },
        { label: "eilo", value: "eilo" },
        { label: "jason", value: "jason" },
    ];
    const rentalInfo = [
        { user:"justin",classroomId: "101", rentalDate: "2024-12-01", isRented: true },
        { user:"eilo",classroomId: "202", rentalDate: "2024-12-05", isRented: false },
        { user:"justin",classroomId: "303", rentalDate: "2024-12-10", isRented: true },
        { user:"elio",classroomId: "403", rentalDate: "2023-11-10", isRented: true },
        { user:"justin",classroomId: "303", rentalDate: "2023-11-10", isRented: true },
        { user:"jason",classroomId: "503", rentalDate: "2023-11-10", isRented: false },
    ];
    const filteredRentalInfo = rentalInfo.filter(item => {
        if (selectedOption) {
            return item.user === selectedOption.value;
        }
        return true;  // 如果沒選擇使用者，顯示所有紀錄
    });
    return (
        <Box
            sx={{
                width:'100%',

                height:'95vh'
            }}
        >
            <Card sx={{ width: '100%', height: '100%' }}>
                <ComboBox sx={{width:'95%',marginTop:'1%',marginLeft:'2.5%'}}
                    options={options}
                    label="請選擇想調閱的使用者"
                    value={selectedOption}
                    onChange={handleChange}
                />
                <Box
                    sx={{
                        maxHeight: '80vh',  // 設定最大高度，根據需要調整
                        overflowY: 'auto',  // 啟用垂直滾動
                        padding: '1%',  // 設定內邊距
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