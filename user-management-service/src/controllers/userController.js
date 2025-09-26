/**
 * User Controller
 * 
 * This file contains the business logic for user registration and login.
 * It interacts with the User model, handles input validation, encrypts passwords,
 * verifies credentials, and generates authentication tokens.
 */

const User = require('../models/userModel'); // Import User model
const bcrypt = require('bcrypt');            // For hashing and comparing passwords
const jwt = require('jsonwebtoken');         // For generating authentication tokens

/**
 * Register a new user
 * 
 * Workflow:
 * 1. Extracts `username`, `email`, and `password` from request body.
 * 2. Hashes the password using bcrypt for security.
 * 3. Creates and saves a new User in the database.
 * 4. Returns success or error response.
 * 
 * @route   POST /api/users/register
 * @access  Public
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash password before saving to DB (10 rounds of salting)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save to MongoDB
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        // Handle errors (e.g., duplicate email/username, DB error)
        res.status(500).json({ error: 'Registration failed.' });
    }
};

/**
 * Login user
 * 
 * Workflow:
 * 1. Extracts `email` and `password` from request body.
 * 2. Finds user in the database by email.
 * 3. Verifies provided password against stored hashed password.
 * 4. If valid, generates a JWT token for authentication.
 * 5. Returns token or error response.
 * 
 * @route   POST /api/users/login
 * @access  Public
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },                      // Payload (user ID)
            process.env.JWT_SECRET || 'secret',    // Secret key
            { expiresIn: '1h' }                    // Token expiry time
        );

        // Send token to client
        res.status(200).json({ token });
    } catch (error) {
        // Handle errors (e.g., DB failure)
        res.status(500).json({ error: 'Login failed.' });
    }
};
