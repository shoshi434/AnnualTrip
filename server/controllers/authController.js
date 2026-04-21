const Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');


const teacherLogin = async (req, res) => {
    const { id } = req.body;
    try {
        const teacher = await Teacher.findOne({ id });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const teacherInfo = {id: teacher.id, fullName: teacher.fullName, className: teacher.className,role: "teacher"};
        const token = jwt.sign(teacherInfo, process.env.JWT_SECRET);
        res.json({ token:token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
};

const parentLogin = async (req, res) => {
    const { id } = req.body;
    try {
        const parent = await Parent.findOne({ id });
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        const parentInfo = {childId: parent.id, childName: parent.fullName, role: "parent"};
        const token = jwt.sign(parentInfo, process.env.JWT_SECRET);
        res.json({ token:token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    teacherLogin,
    parentLogin
};