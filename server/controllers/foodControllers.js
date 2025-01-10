const Food = require('../models/food');

// Get all foods
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new food
const createFood = async (req, res) => {
    try {
        const newFood = new Food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get food by ID
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get food by category
const getFoodByCategory = async (req, res) => {
    try {
        const foods = await Food.find({ category: req.params.category });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update food
const updateFood = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedFood) return res.status(404).json({ message: 'Food not found' });
        res.json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete food
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Food.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create many foods at once
const createManyFoods = async (req, res) => {
    try {
        const foods = await Food.insertMany(req.body);
        res.status(201).json(foods);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update many foods
const updateManyFoods = async (req, res) => {
    try {
        const { updates } = req.body;
        const updateOperations = updates.map(async update => {
            return Food.findByIdAndUpdate(update._id, update, { new: true });
        });
        const updatedFoods = await Promise.all(updateOperations);
        res.json(updatedFoods);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Search foods
const searchFoods = async (req, res) => {
    try {
        const { query } = req.query;
        const foods = await Food.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get foods by price range
const getFoodsByPriceRange = async (req, res) => {
    try {
        const { min, max } = req.query;
        const foods = await Food.find({
            price: { $gte: min || 0, $lte: max || Number.MAX_VALUE }
        });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get foods by dietary restrictions
const getFoodsByDietary = async (req, res) => {
    try {
        const { isVegetarian, isVegan, isGlutenFree } = req.query;
        const query = {};
        if (isVegetarian) query.isVegetarian = isVegetarian === 'true';
        if (isVegan) query.isVegan = isVegan === 'true';
        if (isGlutenFree) query.isGlutenFree = isGlutenFree === 'true';
        
        const foods = await Food.find(query);
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFoods,
    createFood,
    getFoodById,
    getFoodByCategory,
    updateFood,
    deleteFood,
    getCategories,
    createManyFoods,
    updateManyFoods,
    searchFoods,
    getFoodsByPriceRange,
    getFoodsByDietary
};