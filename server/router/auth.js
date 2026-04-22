const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/teacherLogin', authController.teacherLogin);
router.post('/parentLogin', authController.parentLogin);

module.exports = router;