const axios = require('axios');

// 定義 API 測試參數
const apiUrl = 'http://localhost:8080/api/classroom_status/update';
const params = {
    floor: '3F',
    classroomCode: '305',
    status: 'borrowed',
    startTime: '2024-06-01T09:00:00',
    endTime: '2024-06-01T10:00:00'
};

// 發送 POST 請求測試 API
const testApi = async () => {
    try {
        const response = await axios.post(apiUrl, null, { params });
        console.log('API 回應狀態碼:', response.status);
        console.log('API 回應內容:', response.data);
    } catch (error) {
        console.error('API 測試失敗:', error.response?.data || error.message);
    }
};

testApi();