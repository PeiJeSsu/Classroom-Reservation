import React from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTranslation } from 'react-i18next';

function Logout() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.setItem("isLoggedIn", "false");
            localStorage.setItem("userRole", "");
            navigate("/login");
        } catch (error) {
            console.error("登出失敗：", error.message);
        }
    };

    return (
        <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none", marginRight: 2}}
        >
            {t("登出")}
        </Button>
    );
}

export default Logout;
