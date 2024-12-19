import React from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';

export default function ComboBox({
                                     options = [],
                                     label = "選擇選項",
                                     multiple = false,
                                     value,
                                     onChange,
                                     sx = {},
                                 }) {
    return (
        <Box sx={sx}>
            <Autocomplete
                options={options}
                multiple={multiple}
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        // 如果是自由輸入的文字
                        onChange(event, { label: newValue, value: newValue });
                    } else if (newValue && newValue.inputValue) {
                        // 如果是輸入的新選項
                        onChange(event, { label: newValue.inputValue, value: newValue.inputValue });
                    } else {
                        // 選擇既有選項
                        onChange(event, newValue);
                    }
                }}
                getOptionLabel={(option) => {
                    // 處理自由輸入的選項
                    if (typeof option === "string") {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.label || "";
                }}
                filterOptions={(options, state) => {
                    // 自由輸入時，將輸入的值加入選項
                    const filtered = options.filter((option) =>
                        option.label.toLowerCase().includes(state.inputValue.toLowerCase())
                    );
                    if (state.inputValue !== "") {
                        filtered.push({
                            inputValue: state.inputValue,
                            label: `新增選項 "${state.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                freeSolo
                renderInput={(params) => <TextField {...params} label={label} />}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
            />
        </Box>
    );
}
