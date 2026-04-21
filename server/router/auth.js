const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Teacher login
router.post('/teacherLogin', authController.teacherLogin);

module.exports = router;