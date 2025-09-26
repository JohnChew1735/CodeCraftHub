/**
 * User Routes
 * 
 * This file defines all the API endpoints related to user operations.
 * It maps HTTP routes to controller functions.
 * 
 * Endpoints:
 *   POST /register -> Register a new user
 *   POST /login    -> Authenticate a user and return a JWT token
 */

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // Import controller functions

// Initialize Express Router
const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & return JWT token
 * @access  Public
 */
router.post('/login', loginUser);

// Export router so it can be used in app.js
module.exports = router;
