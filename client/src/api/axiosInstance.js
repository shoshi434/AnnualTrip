import axios from 'axios';

// יצירת מופע של axios עם הגדרות בסיסיות        
const api = axios.create({
    baseURL: 'http://localhost:3200/api', 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;