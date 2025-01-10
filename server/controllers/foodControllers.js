const Food = require('../models/food');

// Get all food items
const getAllFood = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get food by ID
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
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

// Create new food item
const createFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Name, price, and category are required" });
        }

        const food = await Food.create({
            name,
            description,
            price,
            category
        });

        res.status(201).json({
            message: "Food item created successfully",
            food
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update food item
const updateFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const food = await Food.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category
            },
            { new: true }
        );

        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        res.json({
            message: "Food item updated successfully",
            food
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete food item
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        res.json({ message: "Food item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFood,
    getFoodById,
    getFoodByCategory,
    createFood,
    updateFood,
    deleteFood
};