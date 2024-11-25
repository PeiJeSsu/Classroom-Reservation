import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from "../config/firebase"; // Firebase 配置
import { CircularProgress, Box } from "@mui/material"; // 用於加載中狀態

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 加入加載中狀態

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // 設置認證狀態
            setIsLoading(false); // 完成檢查後設置加載為 false
        });

        // 清理訂閱
        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress /> {/* 加載中圖標 */}
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // 重定向到登錄頁面
    }

    return children; // 如果用戶已登錄，則顯示子組件
}

export default ProtectedRoute;
