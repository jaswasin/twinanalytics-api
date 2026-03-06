/**
 * Global Error Handler Middleware
 *
 * Catches all errors forwarded via next(err) and returns a
 * consistent JSON response. In development mode, the stack
 * trace is included; in production, it is omitted.
 */

const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const isDev = process.env.NODE_ENV !== 'production';

    // Log the error for debugging
    if (statusCode >= 500) {
        console.error('❌  Server Error:', err);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(err.errors && err.errors.length > 0 && { errors: err.errors }),
        ...(isDev && { stack: err.stack }),
    });
};

module.exports = errorHandler;
