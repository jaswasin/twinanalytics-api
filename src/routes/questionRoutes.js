/**
 * Question Routes
 *
 * Maps HTTP methods + paths to controller handlers,
 * with input validation via express-validator.
 */

const express = require('express');
const { body, param } = require('express-validator');

const validate = require('../middleware/validate');
const questionController = require('../controllers/questionController');

const router = express.Router();

// ─── GET /api/questions ─────────────────────────────────
router.get('/', questionController.getAll);

// ─── GET /api/questions/:id ─────────────────────────────
router.get(
    '/:id',
    [param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')],
    validate,
    questionController.getById
);

// ─── POST /api/questions ────────────────────────────────
router.post(
    '/',
    [
        body('text')
            .trim()
            .notEmpty()
            .withMessage('Question text is required'),
    ],
    validate,
    questionController.create
);

// ─── PUT /api/questions/:id ─────────────────────────────
router.put(
    '/:id',
    [
        param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
        body('text')
            .trim()
            .notEmpty()
            .withMessage('Question text is required'),
    ],
    validate,
    questionController.update
);

module.exports = router;
