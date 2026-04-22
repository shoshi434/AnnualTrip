const Student = require('../models/student');
// יצירת תלמידה חדשה
const createStudent = async (req, res) => {
    try {
        const { fullName, id, className } = req.body;
        const existing = await Student.findOne({ id });
        if (existing) {
            return res.status(400).json({ message: 'תלמיד עם תעודת זהות זו כבר רשום' });
        }
        const student = await Student.create({ fullName, id, className });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// שליפת כל התלמידות
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// שליפת תלמידה לפי תעודת זהות
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({ id: req.params.id });
        if (!student) {
            return res.status(404).json({ message: 'תלמיד לא נמצא' });
        }   
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// שליפת רשימת תלמידות לפי שם הכיתה
const getStudentsByClassName = async (req, res) => {
    try {
        const { className } = req.params;
        const students = await Student.find({ className: className });
        if (students.length === 0) {
            return res.status(404).json({ message: 'לא נמצאו תלמידים עבור כיתה זו' });
        }
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    getStudentsByClassName
};