const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authMiddleware , onlyTeachers} = require('../middleware/authMiddleware');

router.post('/', studentController.createStudent);
router.get('/', authMiddleware, onlyTeachers, studentController.getAllStudents);
router.get('/byClass/:className', authMiddleware, onlyTeachers, studentController.getStudentsByClassName);
router.get('/:id', authMiddleware, onlyTeachers, studentController.getStudentById);

module.exports = router;