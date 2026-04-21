const Teacher = require('../models/teacher');

// Create a new teacher
createTeacher = async (req, res) => {
    try {
        const { fullName, id, className } = req.body;
        const teacher = await Teacher.create({ fullName, id, className });
        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all teachers
getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a teacher by ID
getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ id: req.params.id });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
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