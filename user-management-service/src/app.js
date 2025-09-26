/**
 * Main Application Entry Point
 * 
 * This file initializes the Express server, connects to MongoDB, 
 * sets up routes, and global error handling.
 * 
 * Best practices included:
 * - Environment variable configuration using dotenv
 * - Modular server and DB setup
 * - Centralized error handling
 * - Clear route separation
 */

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const connectDB = require('./config/db');       // MongoDB connection
const initServer = require('./config/server');  // Express app configuration (middlewares)
const userRoutes = require('./routes/userRoutes'); // User API routes
const errorHandler = require('./utils/errorHandler'); // Global error handler

// Initialize Express app with middleware (CORS, JSON parsing, etc.)
const app = initServer();

// Connect to MongoDB using MONGO_URI from environment variables
connectDB();

// Register API routes for user management
app.use('/api/users', userRoutes);

// Register global error handler (must be after all routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
