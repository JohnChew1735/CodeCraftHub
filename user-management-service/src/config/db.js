/**
 * db.js
 *
 * This file is responsible for establishing and managing the MongoDB connection
 * using Mongoose. It exports a reusable `connectDB` function that can be called
 * when the application starts (e.g., inside app.js).
 *
 * - Uses the MONGO_URI from the environment variables (.env file).
 * - Ensures connection with recommended options (new URL parser and unified topology).
 * - Logs a success message when the connection is successful.
 * - Gracefully handles errors and exits the process if the connection fails.
 */

const mongoose = require('mongoose');

/**
 * Connects the application to the MongoDB database.
 * Uses Mongoose under the hood for schema-based data modeling.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,      // Enables the new MongoDB connection string parser
            useUnifiedTopology: true    // Enables the new server discovery and monitoring engine
        });

        console.log('MongoDB connected successfully.');
    } catch (error) {
        // If connection fails, log the error and exit the process with failure
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit with status code 1 (indicates an error)
    }
};

// Export the function so it can be imported and used in other files (e.g., app.js)
module.exports = connectDB;
