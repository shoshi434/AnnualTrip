const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// Create a new teacher
router.post('/', async (req, res) => {
    const { fullName, id, className } = req.body;
    const teacher= await Teacher.create({ fullName, id, className });
    res.status(201).json(teacher);
});

module.exports = router;