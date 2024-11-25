// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 確保引入 getAuth 函數
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXdk7W9f3-Kd-fi8cgi05BNRmLrzC4MDc",
    authDomain: "classroom-reservation-ec4f6.firebaseapp.com",
    projectId: "classroom-reservation-ec4f6",
    storageBucket: "classroom-reservation-ec4f6.appspot.com", // 修正錯誤的域名
    messagingSenderId: "655547608370",
    appId: "1:655547608370:web:3640c1be79739e47833b2b",
    measurementId: "G-QBYLYSC5T5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // 初始化 Firebase Authentication
const db = getFirestore(app); // Firestore

export { app, analytics, auth, db };
