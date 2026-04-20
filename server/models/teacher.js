const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  }
}, { timestamps: true });

 module.exports = mongoose.model('Teacher', teacherSchema);

