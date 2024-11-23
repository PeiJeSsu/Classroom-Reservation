import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import BasicTabs from '../overalllayout/OverallLayout';
import RegisterPage from "../login/RegisterPage";
import LoginPage from "../login/LoginPage";

function MainPage() {
    const navigate = useNavigate();

    return (
        <div className="main-page">
            <div>
                <BasicTabs />
            </div>

            <div className="button-container">
                <button onClick={() => navigate('/register')}>Register</button>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default App;
