/**
 * Async Handler Wrapper
 *
 * Wraps an async route handler so that any rejected promise
 * is automatically forwarded to Express's next() error handler.
 * This eliminates the need for try/catch in every controller.
 *
 * Usage:
 *   router.get('/items', asyncHandler(controller.getAll));
 *
 * @param {Function} fn  Async Express route handler
 * @returns {Function}   Wrapped handler
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
