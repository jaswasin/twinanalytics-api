/**
 * Question Controller
 *
 * Handles HTTP request/response for the question resource.
 */

const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const questionService = require('../services/questionService');

/**
 * GET /api/questions
 * Retrieve all questions.
 */
const getAll = asyncHandler(async (_req, res) => {
    const questions = await questionService.getAll();

    res.status(200).json({
        success: true,
        count: questions.length,
        data: questions,
    });
});

/**
 * GET /api/questions/:id
 * Retrieve a single question by ID.
 */
const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const question = await questionService.getById(id);

    if (!question) {
        throw new AppError(`Question with id ${id} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        data: question,
    });
});

/**
 * POST /api/questions
 * Create a new question.
 */
const create = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const question = await questionService.create({ text });

    res.status(201).json({
        success: true,
        message: 'Question created successfully.',
        data: question,
    });
});

/**
 * PUT /api/questions/:id
 * Update an existing question.
 */
const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const question = await questionService.update(id, { text });

    if (!question) {
        throw new AppError(`Question with id ${id} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        message: 'Question updated successfully.',
        data: question,
    });
});

module.exports = {
    getAll,
    getById,
    create,
    update,
};
