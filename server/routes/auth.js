const router = require('express').Router();
const { register, login } = require('../controllers/authController');

// Define the routes using the router
router.post("/register", register); // Use the register controller here
router.post("/login", login);       // Use the login controller here

// Export the router to be used in the main app
module.exports = router;
