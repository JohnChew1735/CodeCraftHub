/**
 * Load environment variables from the .env file into process.env
 * 
 * The `dotenv` package reads key-value pairs from the `.env` file
 * and makes them available via `process.env`. 
 * This allows you to securely manage configuration such as database 
 * connection strings, API keys, and application ports without 
 * hardcoding them into the codebase.
 */
require('dotenv').config();
