// src/config/apiConfig.js
import axios from 'axios';

export const apiConfig = axios.create({
    baseURL: `https://classroom-reservation.onrender.com`,
    headers: {
        'Content-Type': 'application/json',
    },
});
