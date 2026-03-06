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

/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get all analytics records
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of all analytics records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Analytics'
 */
router.get('/', analyticsController.getAll);

/**
 * @swagger
 * /api/analytics/{id}:
 *   get:
 *     summary: Get an analytics record by ID
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Analytics record ID
 *     responses:
 *       200:
 *         description: A single analytics record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Analytics'
 *       404:
 *         description: Record not found
 */
router.get(
    '/:id',
    [param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')],
    validate,
    analyticsController.getById
);

/**
 * @swagger
 * /api/analytics:
 *   post:
 *     summary: Create a new analytics record
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, value]
 *             properties:
 *               name:
 *                 type: string
 *                 example: page_views
 *               value:
 *                 type: number
 *                 example: 1024
 *     responses:
 *       201:
 *         description: Record created successfully
 *       400:
 *         description: Validation error
 */
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

/**
 * @swagger
 * /api/analytics/{id}:
 *   put:
 *     summary: Update an analytics record
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: page_views
 *               value:
 *                 type: number
 *                 example: 2048
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       404:
 *         description: Record not found
 *       400:
 *         description: Validation error
 */
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
