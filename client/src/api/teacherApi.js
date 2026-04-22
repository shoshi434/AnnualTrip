import api from './axiosInstance';

const getAllTeachers =  () => api.get('/teachers');
const getTeacherById = (id) => api.get(`/teachers/${id}`);
const createTeacher = (teacherData) => api.post('/teachers', teacherData);
const teacherLogin = (Details) => api.post('/auth/teacherLogin', Details);
export {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    teacherLogin
};