import api from './axiosInstance';

const getLocations = () => api.get('/locations');

export { getLocations};