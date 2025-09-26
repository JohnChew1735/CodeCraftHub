/**
 * Error Handler Middleware
 * 
 * Centralized error handling middleware for Express applications.
 * 
 * Responsibilities:
 *  - Logs errors using the custom logger
 *  - Ensures consistent error responses to the client
 *  - Prevents leaking sensitive details (stack traces, DB info) in production
 * 
 * Usage:
 *   app.use(errorHandler);
 */

const logger = require('./logger');

/**
 * Express error-handling middleware.
 * 
 * @param {Error} err - The error object thrown in the application.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging / monitoring
    logger.error(err);

    // Respond with a generic message
    res.status(500).json({
        error: 'Something went wrong. Please try again later.'
    });
};

module.exports = errorHandler;
