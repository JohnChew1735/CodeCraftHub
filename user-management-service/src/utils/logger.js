/**
 * Logger Configuration (Winston)
 * 
 * Provides a centralized logger instance for the application.
 * Logs are written both to the console and a file (error.log).
 * 
 * Usage:
 *   const logger = require('./logger');
 *   logger.info('Server started');
 *   logger.error('Something went wrong');
 */

const { createLogger, format, transports } = require('winston');

// Custom log format with timestamp & log level
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
);

const logger = createLogger({
    level: 'info', // default log level
    format: logFormat,
    transports: [
        // Log errors into file
        new transports.File({ filename: 'error.log', level: 'error' }),

        // Log everything into console (with colors for readability)
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            )
        })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'rejections.log' })
    ]
});

module.exports = logger;
