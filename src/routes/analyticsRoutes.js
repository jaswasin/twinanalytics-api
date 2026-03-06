/**
 * Analytics Routes
 *
 * Maps HTTP methods + paths to controller handlers,
 * with input validation via express-validator.
 */

const express = require('express');
const { body, param } = require('express-validator');

const validate = require('../middleware/validate');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

// ─── GET /api/analytics ─────────────────────────────────
router.get('/', analyticsController.getAll);

// ─── GET /api/analytics/:id ─────────────────────────────
router.get(
    '/:id',
    [param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')],
    validate,
    analyticsController.getById
);

// ─── POST /api/analytics ────────────────────────────────
router.post(
    '/',
    [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ max: 255 })
            .withMessage('Name must be at most 255 characters'),
        body('value')
            .notEmpty()
            .withMessage('Value is required')
            .isNumeric()
            .withMessage('Value must be a number'),
    ],
    validate,
    analyticsController.create
);

// ─── PUT /api/analytics/:id ─────────────────────────────
router.put(
    '/:id',
    [
        param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
        body('name')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('Name cannot be empty')
            .isLength({ max: 255 })
            .withMessage('Name must be at most 255 characters'),
        body('value')
            .optional()
            .isNumeric()
            .withMessage('Value must be a number'),
    ],
    validate,
    analyticsController.update
);

module.exports = router;
