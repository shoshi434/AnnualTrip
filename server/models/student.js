const e = require('express');
const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
    id: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 9
  },
    className: {
    type: String,
    required: true,
    enum: ['ו-1', 'ו-2', 'ו-3', 'ו-4', 'ו-5', 'ו-6']
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;