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
import { useNavigate } from "react-router-dom";
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from "react-i18next";

function Register() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [studentId, setStudentId] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setAlert(null);

        if (role === "borrower" && studentId.length !== 8) {
            setAlert({
                type: "error",
                message: t("學號必須為 8 位數字！"),
            });
            return;
        }

        const registrationEmail =
            role === "borrower" ? `${studentId}@mail.ntou.edu.tw` : email;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registrationEmail,
                password
            );
            const user = userCredential.user;

            await sendEmailVerification(user);

            // 發送註冊資料到後端
            const response = await apiConfig.post("/api/users/register", {
                email: registrationEmail,
                role,
            });

            if (response.status >= 200 && response.status < 300) {
                setAlert({
                    type: "success",
                    message: t("註冊成功！請檢查電子郵件以完成驗證。"),
                });
            } else {
                setAlert({
                    type: "error",
                    message: `${t("註冊失敗：")}${response.data.message}`,
                });
            }
        } catch (error) {
            setAlert({
                type: "error",
                message: `${t("註冊失敗：")}${error.message}`,
            });
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
                    {t("註冊")}
                </Typography>

                <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel id="role-label" sx={{ fontSize: 16 }}>
                        {t("選擇角色")}
                    </InputLabel>
                    <Select
                        labelId="role-label"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        label={t("選擇角色")}
                        sx={{
                            fontSize: 16,
                            height: 56,
                        }}
                    >
                        <MenuItem value="borrower">{t("借用人")}</MenuItem>
                        <MenuItem value="admin">{t("管理員")}</MenuItem>
                    </Select>
                </FormControl>

                {role === "borrower" && (
                    <TextField
                        label={t("學號 (8 位數字)")}
                        type="text"
                        fullWidth
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText={t("輸入的學號將組合為 @mail.ntou.edu.tw 電子郵件地址")}
                    />
                )}

                {role === "admin" && (
                    <TextField
                        label={t("Email")}
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

                <TextField
                    label={t("密碼")}
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ textTransform: "none" }}>
                    {t("註冊")}
                </Button>

                {alert && (
                    <Alert severity={alert.type}>{alert.message}</Alert>
                )}

                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate("/login")}
                    sx={{ textTransform: "none" }}
                >
                    {t("已有帳號？點此登入")}
                </Button>
            </Box>
        </Container>
    );
}

export default Register;
