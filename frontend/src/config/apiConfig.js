import axios from 'axios';

export const API = axios.create({
    baseURL: `https://classroom-reservation.onrender.com`,
    headers: {
        'Content-Type': 'application/json',
    },
});
