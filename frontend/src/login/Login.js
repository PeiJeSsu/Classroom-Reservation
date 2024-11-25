import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Button, Typography, Alert, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Use navigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if email is verified
            if (!user.emailVerified) {
                setMessage("請檢查您的電子郵件並完成驗證。");
                return;
            }

            // Fetch the user's role from the backend
            const response = await fetch("http://localhost:8080/api/users/role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user.email }), // Send email to backend
            });

            if (response.ok) {
                const role = await response.text(); // Assuming the response contains just the role as a string

                // Store the user's role in localStorage
                localStorage.setItem("userRole", role);

                console.log("User role stored:", localStorage.getItem("userRole"));

                setMessage("登入成功！");
                navigate("/"); // Redirect to home page after login
            } else {
                // Handle backend error
                const errorMessage = await response.text();
                setMessage(`取得角色失敗：${errorMessage}`);
            }
        } catch (error) {
            setMessage(`登入失敗：${error.message}`);
        }
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
                    登入
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    label="密碼"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    登入
                </Button>
                {message && (
                    <Alert severity={message.includes("失敗") ? "error" : "success"}>
                        {message}
                    </Alert>
                )}
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/register')}
                >
                    還沒有帳號？點此註冊
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
