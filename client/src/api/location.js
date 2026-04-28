import api from './axiosInstance';

const getLocations = () => api.get('/locations');
const getLocationById = (ids) => api.post('/locations/byId', { ids });

export { getLocations, getLocationById };