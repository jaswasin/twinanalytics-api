/**
 * Validation Middleware
 *
 * Runs the express-validator validation chain and, if errors
 * are present, responds with 400 and a structured error body.
 *
 * Usage (in a route file):
 *
 *   const { body } = require('express-validator');
 *   const validate  = require('../middleware/validate');
 *
 *   router.post(
 *     '/',
 *     [
 *       body('name').trim().notEmpty().withMessage('Name is required'),
 *       body('value').isNumeric().withMessage('Value must be a number'),
 *     ],
 *     validate,
 *     controller.create,
 *   );
 */

const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed.',
            errors: errors.array().map((e) => ({
                field: e.path,
                message: e.msg,
            })),
        });
    }

    next();
};

module.exports = validate;
