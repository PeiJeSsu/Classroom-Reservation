import React, { useState } from "react";
import { auth } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import {
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    Alert,
    Container,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [studentId, setStudentId] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Use navigate hook

    // 處理註冊邏輯
    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(""); // 重置訊息

        // 檢查學號長度是否正確
        if (role === "borrower" && studentId.length !== 8) {
            setMessage("學號必須為 8 位數字！");
            return;
        }

        // 根據角色選擇生成註冊郵件
        const registrationEmail =
            role === "borrower" ? `${studentId}@mail.ntou.edu.tw` : email;

        try {
            // 註冊 Firebase 用戶
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registrationEmail,
                password
            );
            const user = userCredential.user;

            // 發送郵件驗證
            await sendEmailVerification(user);

            // 將用戶資料傳送到後端
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: registrationEmail, role }),
            });

            console.log(response);

            // 根據後端響應顯示訊息
            if (response.ok) {
                setMessage("註冊成功！請檢查電子郵件以完成驗證。");
            } else {
                const errorData = await response.json();
                setMessage(`註冊失敗：${errorData.message}`);
            }
        } catch (error) {
            setMessage(`註冊失敗：${error.message}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleRegister}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    mt: 4,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    註冊
                </Typography>

                {/* 選擇角色 */}
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel id="role-label" sx={{ fontSize: 16 }}>
                        選擇角色
                    </InputLabel>
                    <Select
                        labelId="role-label"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        label="選擇角色"
                        sx={{
                            fontSize: 16,
                            height: 56, // 增加高度避免被截斷
                        }}
                    >
                        <MenuItem value="borrower">借用人</MenuItem>
                        <MenuItem value="admin">管理員</MenuItem>
                    </Select>
                </FormControl>

                {/* 當角色為借用人時，顯示學號輸入框 */}
                {role === "borrower" && (
                    <TextField
                        label="學號 (8 位數字)"
                        type="text"
                        fullWidth
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="輸入的學號將組合為 @mail.ntou.edu.tw 電子郵件地址"
                    />
                )}

                {/* 當角色為管理員時，顯示 email 輸入框 */}
                {role === "admin" && (
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}

                {/* 密碼輸入框 */}
                <TextField
                    label="密碼"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* 註冊按鈕 */}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    註冊
                </Button>

                {/* 顯示錯誤或成功訊息 */}
                {message && (
                    <Alert severity={message.includes("失敗") ? "error" : "success"}>
                        {message}
                    </Alert>
                )}

                {/* 已有帳號時導向登入頁 */}
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate("/login")}
                >
                    已有帳號？點此登入
                </Button>
            </Box>
        </Container>
    );
}

export default Register;
