/**
 * Analytics Controller
 *
 * Handles HTTP request/response for the analytics resource.
 * Delegates business logic to analyticsService.
 * Wrapped in asyncHandler to avoid manual try/catch.
 */

const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const analyticsService = require('../services/analyticsService');

/**
 * GET /api/analytics
 * Retrieve all analytics records.
 */
const getAll = asyncHandler(async (_req, res) => {
    const records = await analyticsService.getAll();

    res.status(200).json({
        success: true,
        count: records.length,
        data: records,
    });
});

/**
 * GET /api/analytics/:id
 * Retrieve a single analytics record by ID.
 */
const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await analyticsService.getById(id);

    if (!record) {
        throw new AppError(`Analytics record with id ${id} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        data: record,
    });
});

/**
 * POST /api/analytics
 * Create a new analytics record.
 */
const create = asyncHandler(async (req, res) => {
    const { name, value } = req.body;
    const record = await analyticsService.create({ name, value });

    res.status(201).json({
        success: true,
        message: 'Record created successfully.',
        data: record,
    });
});

/**
 * PUT /api/analytics/:id
 * Update an existing analytics record.
 */
const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, value } = req.body;
    const record = await analyticsService.update(id, { name, value });

    if (!record) {
        throw new AppError(`Analytics record with id ${id} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        message: 'Record updated successfully.',
        data: record,
    });
});

module.exports = {
    getAll,
    getById,
    create,
    update,
};
