import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {apiConfig} from "../config/apiConfig";
import { useTranslation } from 'react-i18next';

function Login() {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null);
    const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const handleLogin = async (e) => {
        e.preventDefault();
        setAlert(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setAlert({
                    type: "error",
                    message: t('請檢查您的電子郵件並完成驗證。'),
                });
                return;
            }

            // 修正 body 的使用方式
            const response = await apiConfig.post("/api/users/role", {
                email: user.email,
            });

            if (response.status >= 200 && response.status < 300) {
                const role = response.data.role;
                const name = email.split("@")[0];
                localStorage.setItem("userRole", role);
                localStorage.setItem("userName", name);
                localStorage.setItem("userEmail", email);

                setAlert({
                    type: "success",
                    message: t('登入成功！'),
                });
                navigate("/");
            } else {
                setAlert({
                    type: "error",
                    message: `${t('取得角色失敗')}：${response.data.message}`,
                });
            }
        } catch (error) {
            setAlert({
                type: "error",
                message: `${t('登入失敗')}：${error.message}`,
            });
        }
    };


    const handleGoogleLogin = async () => {
        setAlert(null);

        try {
            googleProvider.setCustomParameters({
                prompt: 'select_account',
            });

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const response = await apiConfig.get(`/api/users/${user.email}`);

            if (response.status >= 200 && response.status < 300) {
                const userData = response.data;
                if (userData && userData.email) {
                    setAlert({
                        type: "success",
                        message: t('Google 登入成功！'),
                    });
                    const role = userData.role;
                    const name = userData.email.split("@")[0];
                    localStorage.setItem("userRole", role);
                    localStorage.setItem("userName", name);
                    localStorage.setItem("userEmail", userData.email);
                    navigate("/");
                } else {
                    setEmail(user.email);
                    setIsFirstTimeLogin(true);
                }
            } else {
                setAlert({
                    type: "error",
                    message: `${t('無法取得用戶資訊')}：${response.data.message}`,
                });
            }
        } catch (error) {
            setAlert({
                type: "error",
                message: `${t('Google 登入失敗')}：${error.message}`,
            });
        }
    };


    const handleRoleSubmit = async () => {
        if (
            selectedRole === "borrower" &&
            !/^\d{8}@mail\.ntou\.edu\.tw$/.test(email) &&
            !/^\d{8}@email\.ntou\.edu\.tw$/.test(email)
        ) {
            setAlert({
                type: "error",
                message: t('只有符合特定 email 格式的借用人可以註冊。'),
            });
            setIsFirstTimeLogin(false);
            return;
        }

        try {
            const response = await apiConfig.post("/api/users/register", {
                email: email,
                role: selectedRole,
            });

            if (response.status >= 200 && response.status < 300) {
                setAlert({
                    type: "success",
                    message: t('角色設定成功，註冊完成！'),
                });
                const role = response.data.role;
                const name = email.split("@")[0];
                localStorage.setItem("userRole", role);
                localStorage.setItem("userName", name);
                localStorage.setItem("userEmail", email);
                navigate("/");
            } else {
                setAlert({
                    type: "error",
                    message: `${t('註冊失敗')}：${response.data.message}`,
                });
                setIsFirstTimeLogin(false);
            }
        } catch (error) {
            setAlert({
                type: "error",
                message: `${t('註冊請求失敗')}：${error.message}`,
            });
            setIsFirstTimeLogin(false);
        }
    };

    const toggleLanguage = (event) => {
        const currentLang = i18n.language;
        const newLang = currentLang === "en" ? "zh_tw" : "en";
        i18n.changeLanguage(newLang);
        localStorage.setItem("language", newLang);
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleLogin}
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
                    {t('登入')}
                </Typography>
                <FormControl fullWidth variant="outlined" >
                    <InputLabel id="language-label">{t('選擇系統語言（進入系統後仍可更改）')}</InputLabel>
                    <Select
                        labelId="language-label"
                        value={i18n.language}
                        onChange={toggleLanguage}
                        label={t('選擇系統語言（進入系統後仍可更改）')}
                     >
                        <MenuItem value="en">{t('English')}</MenuItem>
                        <MenuItem value="zh_tw">{t('繁體中文')}</MenuItem>
                    </Select>
                </FormControl>

                {isFirstTimeLogin ? (
                    <>
                        <Typography variant="h5" component="h1" gutterBottom>
                            {t('第一次登入，請選擇您的角色')}
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <FormControlLabel value="borrower" control={<Radio />} label={t('借用人')} />
                                <FormControlLabel value="admin" control={<Radio />} label={t('管理員')} />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRoleSubmit}
                            disabled={!selectedRole}
                            sx={{ textTransform: "none" }}
                        >
                            {t('確認角色')}
                        </Button>
                    </>
                ) : (
                    <>
                        <TextField
                            label={t('Email')}
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label={t('密碼')}
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
                            {t('登入')}
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleGoogleLogin}
                            sx={{ textTransform: "none" }}
                        >
                            {t('使用 Google 登入')}
                        </Button>
                        {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
                        <Button
                            variant="text"
                            color="secondary"
                            fullWidth
                            onClick={() => navigate("/register")}
                            sx={{ textTransform: "none" }}
                        >
                            {t('還沒有帳號？點此註冊')}
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default Login;
