/**
 * User Service
 * 
 * This service layer acts as an abstraction between the controllers
 * and the database model. It contains reusable functions that handle
 * business logic related to user operations.
 * 
 * Keeping this logic in a service layer promotes:
 *  - Scalability (easy to extend with more user-related functions)
 *  - Maintainability (keeps controllers clean and focused)
 *  - Reusability (functions can be reused across multiple controllers)
 */

const User = require('../models/userModel');

/**
 * Find a user by their MongoDB ObjectId.
 * 
 * @param {string} userId - The unique ID of the user in MongoDB.
 * @returns {Promise<Object|null>} - Returns the user document if found, otherwise null.
 * 
 * Example usage:
 *   const user = await userService.findUserById("64adf20c2f...");
 */
exports.findUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        // Log or handle error as needed
        throw new Error(`Error finding user by ID: ${error.message}`);
    }
};
