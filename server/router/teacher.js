const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authMiddleware , onlyTeachers} = require('../middleware/authMiddleware');

// Create a new teacher
router.post('/', teacherController.createTeacher);
// Get all teachers
router.get('/', authMiddleware, onlyTeachers, teacherController.getAllTeachers);
// Get a teacher by ID
router.get('/:id', authMiddleware, onlyTeachers, teacherController.getTeacherById);

module.exports = router;