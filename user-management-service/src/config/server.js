/**
 * server.js
 *
 * This file initializes and configures the Express application server.
 * It sets up middleware like CORS and body-parser and returns
 * the configured Express `app` instance for use in the application.
 *
 * Responsibilities:
 * - Create an Express app instance.
 * - Enable Cross-Origin Resource Sharing (CORS).
 * - Parse incoming JSON requests using body-parser.
 * - Export the initialized server instance so it can be used in app.js.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * Initializes and configures the Express server.
 *
 * @returns {Object} app - Configured Express application instance.
 */
const initServer = () => {
    const app = express();

    // Enable CORS (Cross-Origin Resource Sharing)
    // Allows API to be accessed from different domains
    app.use(cors());

    // Parse incoming request bodies with JSON payloads
    app.use(bodyParser.json());

    return app;
};

// Export the function so it can be called in app.js
module.exports = initServer;
