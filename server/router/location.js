const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', locationController.createLocation);
router.get('/', authMiddleware,locationController.getAllLocations);
router.get('/:id',authMiddleware, locationController.getLocationById);

module.exports = router;