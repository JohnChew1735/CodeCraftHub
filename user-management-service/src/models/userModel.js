/**
 * User Model - Defines the schema and model for user accounts.
 * 
 * This file creates a Mongoose schema for users in the system.
 * It ensures data consistency, enforces validation rules, and
 * defines the collection structure for MongoDB.
 */

const mongoose = require('mongoose');

/**
 * User Schema
 * 
 * Fields:
 * - username: Unique string identifier for the user.
 * - email: User's email, must be unique.
 * - password: Hashed password string (never store plain text).
 * - role: Defines the type of user (student, instructor, or admin).
 * - createdAt: Auto-generated timestamp when the user was created.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,       // Must be provided
        unique: true          // No duplicate usernames allowed
    },
    email: {
        type: String,
        required: true,       // Must be provided
        unique: true          // No duplicate emails allowed
    },
    password: {
        type: String,
        required: true        // Will store hashed password
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'], // Restrict values to allowed roles
        default: 'student'    // Default role if none is specified
    },
    createdAt: {
        type: Date,
        default: Date.now     // Auto-set timestamp when created
    }
});

/**
 * User Model
 * 
 * The model is a wrapper around the schema that provides
 * an interface to interact with the MongoDB collection.
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
