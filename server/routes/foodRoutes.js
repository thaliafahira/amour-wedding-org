const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const foodController = require('../controllers/foodController');

// Food routes
router.get('/', authenticateToken, foodController.getAllFoods);
router.post('/', authenticateToken, foodController.createFood);

module.exports = router;