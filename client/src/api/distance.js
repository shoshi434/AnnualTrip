import api from "./axiosInstance";

const calculateDistance = async (lat1, lon1, lat2, lon2) => {
    const response = await api.post("/distance", { lat1, lon1, lat2, lon2 });
    return response.data;
};

export { calculateDistance };
