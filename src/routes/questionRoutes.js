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

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 163
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 */
router.get('/', questionController.getAll);

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Question ID
 *     responses:
 *       200:
 *         description: A single question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
    '/:id',
    [param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')],
    validate,
    questionController.getById
);

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
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
 *                 example: What is your favorite color?
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Question'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Question ID
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
 *                 example: Updated question text?
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
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
            .withMessage('Question text is required'),
    ],
    validate,
    questionController.update
);

module.exports = router;
