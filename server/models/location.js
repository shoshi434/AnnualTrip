const e = require('express');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 9
    },
    longitude: { 
           type: Number,
           required: true
    },
    latitude: { 
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Location', locationSchema);