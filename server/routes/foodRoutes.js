const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const foodController = require('../controllers/foodController');

// Public routes (no authentication required)
router.get('/', foodController.getAllFoods);
router.get('/category/:category', foodController.getFoodByCategory);
router.get('/:id', foodController.getFoodById);

// Protected routes (require authentication)
router.post('/', authenticateToken, foodController.createFood);
router.put('/:id', authenticateToken, foodController.updateFood);
router.delete('/:id', authenticateToken, foodController.deleteFood);

// Category management
router.get('/categories/list', foodController.getCategories);

// Bulk operations
router.post('/bulk', authenticateToken, foodController.createManyFoods);
router.put('/bulk', authenticateToken, foodController.updateManyFoods);

// Search and filter
router.get('/search', foodController.searchFoods);
router.get('/filter/price-range', foodController.getFoodsByPriceRange);
router.get('/filter/dietary', foodController.getFoodsByDietary);

module.exports = router;