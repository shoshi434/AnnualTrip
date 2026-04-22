import api from './axiosInstance';

const parentLogin = (Details) => api.post('/auth/parentLogin', Details);

export {
    parentLogin
};