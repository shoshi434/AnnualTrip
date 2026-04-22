const Teacher = require('../models/teacher');

// יצירת מורה חדשה
createTeacher = async (req, res) => {
    try {
        const { fullName, id, className } = req.body;
        const existing = await Teacher.findOne({ id });
        if (existing) {
            return res.status(400).json({ message: 'מורה עם תעודת זהות זו כבר רשום' });
        }
        const teacher = await Teacher.create({ fullName, id, className });
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// שליפת כל המורות
getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// שליפת מורה לפי תעודת זהות
getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id });
        if (!teacher) {
            return res.status(404).json({ message: 'מורה לא נמצא' });
        }
        res.json(teacher);
    } catch (error) {        
        res.status(500).json({ message: error.message });
    }   
};



module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById
};