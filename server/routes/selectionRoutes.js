// routes/selectionRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const selectionController = require('../controllers/selectionController');

// Selection routes
router.get('/', authenticateToken, selectionController.getSelections);
router.post('/', authenticateToken, selectionController.saveSelections);

module.exports = router;