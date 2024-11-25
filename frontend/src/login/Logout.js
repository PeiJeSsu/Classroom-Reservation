import React from "react";
import { auth } from "../config/firebase"; // Ensure your Firebase config is correctly set
import { signOut } from "firebase/auth"; // Import Firebase signOut method
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Button from "@mui/material/Button"; // Import MUI Button

function Logout() {
    const navigate = useNavigate(); // Used to redirect to login page

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the Firebase user
            localStorage.setItem("isLoggedIn", "false"); // Clear login status
            localStorage.setItem("userRole", ""); // Clear user role
            navigate("/login"); // Redirect to login page
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
        >
            登出
        </Button>
    );
}

export default Logout;
