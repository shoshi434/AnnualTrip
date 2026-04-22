import axios from 'axios';

// יצירת מופע של axios עם הגדרות בסיסיות        
const api = axios.create({
    baseURL: 'http://localhost:3200/api', 
});

export default api;