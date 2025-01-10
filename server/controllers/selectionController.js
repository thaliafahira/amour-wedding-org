// controllers/selectionController.js
const Selection = require('../models/Selection'); // Create this model

const selectionController = {
  getSelections: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      const selections = await Selection.find({ userId });
      res.json(selections);
    } catch (error) {
      console.error('Error getting selections:', error);
      res.status(500).json({ message: 'Error retrieving selections' });
    }
  },

  saveSelections: async (req, res) => {
    try {
      const userId = req.user.id; // From auth middleware
      const selections = req.body;
      
      // Delete existing selections for this user
      await Selection.deleteMany({ userId });
      
      // Save new selections
      const newSelections = await Selection.create({
        userId,
        items: selections
      });
      
      res.json(newSelections);
    } catch (error) {
      console.error('Error saving selections:', error);
      res.status(500).json({ message: 'Error saving selections' });
    }
  }
};

module.exports = selectionController;