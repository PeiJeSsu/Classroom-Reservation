import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';  // Check if user is logged in

    if (!isAuthenticated) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return children;  // If authenticated, render the children components
}

export default ProtectedRoute;
