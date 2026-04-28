const express = require('express');
const router = express.Router();

const distanceController = require('../controllers/distanceController');

router.post('/', distanceController.distanceController);

module.exports = router;