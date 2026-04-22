import api from './axiosInstance';

const getAllStudents =  () => api.get('/students');
const getStudentById = (id) => api.get(`/students/${id}`);
const createStudent = (studentData) => api.post('/students', studentData);
const getStudentsByClassName = (className) => api.get(`/students/byClass`, { params: { className } });

export {
    getAllStudents,
    getStudentById,
    createStudent,
    getStudentsByClassName
};