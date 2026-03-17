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
 * /api/personas/demographic-filters:
 *   get:
 *     summary: Get all demographic filters
 *     tags: [Personas]
 *     responses:
 *       200:
 *         description: List of demographic filters
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
 *                       tagid:
 *                         type: integer
 *                       tag:
 *                         type: string
 *                       question_id:
 *                         type: integer
 *                       text:
 *                         type: string
 */
router.get('/demographic-filters', personaController.getDemographicFilter);

/**
 * @swagger
 * /api/personas/demographic-filters/{tagId}/{optionid}/persons:
 *   get:
 *     summary: Get persons by demographic tag ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Demographic Tag ID
 *       - in: path
 *         name: optionid
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Option ID
 *     responses:
 *       200:
 *         description: List of persons matching the demographic
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
 */
router.get(
    '/demographic-filters/:tagId/:optionid/persons',
    [param('tagId').isInt({ min: 1 }).withMessage('Tag ID must be a positive integer')],
    [param('optionid').isInt({ min: 1 }).withMessage('Option ID must be a positive integer')],
    validate,
    personaController.getPersonsByDemographics
);

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

/**
 * @swagger
 * /api/personas/person/{pid}:
 *   get:
 *     summary: Get a person details by ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Person ID
 *     responses:
 *       200:
 *         description: A single person details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Person not found
 */
router.get(
    '/person/:pid',
    [param('pid').isInt({ min: 1 }).withMessage('PID must be a positive integer')],
    validate,
    personaController.getPersonDetailsById
);

/**
 * @swagger
 * /api/personas/person/{pid}/demographics:
 *   get:
 *     summary: Get a person's demographic details by ID
 *     tags: [Personas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Person ID
 *     responses:
 *       200:
 *         description: Demographic details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Demographics not found
 */
router.get(
    '/person/:pid/demographics',
    [param('pid').isInt({ min: 1 }).withMessage('PID must be a positive integer')],
    validate,
    personaController.getDemographicsByPid
);

module.exports = router;
