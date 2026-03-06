/**
 * Custom Application Error
 *
 * Extends the built-in Error class to carry an HTTP status code
 * and an optional `errors` array (for validation errors).
 */

class AppError extends Error {
    /**
     * @param {string} message   Human-readable error message
     * @param {number} statusCode  HTTP status code (default 500)
     * @param {Array}  errors    Optional array of field-level errors
     */
    constructor(message, statusCode = 500, errors = []) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
