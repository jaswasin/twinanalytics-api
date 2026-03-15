/**
 * Persona Routes
 *
 * Maps HTTP methods + paths to persona controller handlers,
 * with input validation via express-validator.
 */

const express = require('express');
const { body, param } = require('express-validator');

const validate = require('../middleware/validate');
const personaController = require('../controllers/personaController');

const router = express.Router();

/**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: Get all personas
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: List of all personas
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       text:
 *                         type: string
 */
router.get('/', personaController.getAll);

/**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: Get a persona by ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Persona ID
 *     responses:
 *       200:
 *         description: A single persona
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     text:
 *                       type: string
 *       404:
 *         description: Persona not found
 */
router.get(
    '/:id',
    [param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')],
    validate,
    personaController.getById
);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     summary: Create a new persona
 *     tags: [Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *                 example: Helpful Assistant
 *     responses:
 *       201:
 *         description: Persona created successfully
 *       400:
 *         description: Validation error
 */
router.post(
    '/',
    [
        body('text')
            .trim()
            .notEmpty()
            .withMessage('Persona text is required'),
    ],
    validate,
    personaController.create
);

/**
 * @swagger
 * /api/personas/{id}:
 *   put:
 *     summary: Update an existing persona
 *     tags: [Personas]
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
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *                 example: Updated Persona Text
 *     responses:
 *       200:
 *         description: Persona updated successfully
 *       404:
 *         description: Persona not found
 *       400:
 *         description: Validation error
 */
router.put(
    '/:id',
    [
        param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
        body('text')
            .trim()
            .notEmpty()
            .withMessage('Persona text is required'),
    ],
    validate,
    personaController.update
);

module.exports = router;
