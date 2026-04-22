const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authMiddleware , onlyTeachers} = require('../middleware/authMiddleware');


router.post('/', teacherController.createTeacher);
router.get('/', authMiddleware, onlyTeachers, teacherController.getAllTeachers);
router.get('/:id', authMiddleware, onlyTeachers, teacherController.getTeacherById);

module.exports = router;