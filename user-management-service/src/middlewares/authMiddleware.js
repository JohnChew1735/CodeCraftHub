/**
 * Authentication Middleware
 * 
 * This middleware verifies the presence and validity of a JSON Web Token (JWT)
 * in the request's Authorization header. It is used to protect routes that
 * require authentication.
 * 
 * Usage:
 *   Add this middleware to any route that needs protection.
 *   Example: router.get('/profile', authMiddleware, profileController);
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware function to authenticate requests using JWT.
 * 
 * Steps:
 *  1. Extract the token from the "Authorization" header (format: "Bearer <token>").
 *  2. If no token is provided, deny access with a 401 response.
 *  3. Verify the token using the secret stored in environment variables.
 *  4. If valid, attach decoded payload (e.g., user ID) to req.user and allow the request to continue.
 *  5. If invalid, return a 400 response with "Invalid token."
 */
const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header (Bearer <token>)
    const token = req.header('Authorization')?.split(' ')[1];

    // If no token is found, block the request
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        // Verify token using JWT secret
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach verified user payload to request object
        req.user = verified;

        // Continue to the next middleware/route handler
        next();
    } catch (error) {
        // If token verification fails
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
