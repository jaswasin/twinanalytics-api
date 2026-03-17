/**
 * Question Controller
 *
 * Handles HTTP request/response for the question resource.
 */

const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const personaService = require('../services/personaService');

/**
 * GET /api/personas
 * Retrieve all personas.
 */
const getAll = asyncHandler(async (_req, res) => {
    const personas = await personaService.getAll();

    res.status(200).json({
        success: true,
        count: personas.length,
        data: personas,
    });
});

/**
 * GET /api/personas/:id
 * Retrieve a single persona by ID.
 */
const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const persona = await personaService.getById(id);

    if (!persona) {
        throw new AppError(`Persona with id ${id} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        data: persona,
    });
});

/**
 * POST /api/personas
 * Create a new persona.
 */
const create = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const persona = await personaService.create({ text });

    res.status(201).json({
        success: true,
        message: 'Persona created successfully.',
        data: persona,
    });
});

/**
 * PUT /api/personas/:id
 * Update an existing persona.
 */
const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const persona = await personaService.update(id, { text });

    if (!persona) {
        throw new AppError(`Persona with id ${id} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        message: 'Persona updated successfully.',
        data: persona,
    });
});

/**
 * GET /api/personas/person/:pid
 * Retrieve a single person's details by pid.
 */
const getPersonDetailsById = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const person = await personaService.getPersonDetailsById(pid);

    if (!person) {
        throw new AppError(`Person with pid ${pid} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        data: person,
    });
});

/**
 * GET /api/personas/person/:pid/demographics
 * Retrieve a person's demographic details by pid.
 */
const getDemographicsByPid = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const demographics = await personaService.getDemographicsByPid(pid);

    if (!demographics) {
        throw new AppError(`Demographics for person with pid ${pid} not found.`, 404);
    }

    res.status(200).json({
        success: true,
        data: demographics,
    });
});

/**
 * GET /api/personas/demographic-filters
 * Retrieve demographic filters.
 */
const getDemographicFilter = asyncHandler(async (_req, res) => {
    const filters = await personaService.getDemographicFilter();

    res.status(200).json({
        success: true,
        count: filters.length,
        data: filters,
    });
});

/**
 * GET /api/personas/demographic-filters/:tagId/persons
 * Retrieve persons by demographic filter.
 */
const getPersonsByDemographics = asyncHandler(async (req, res) => {
    const { tagId, optionid } = req.params;
    const persons = await personaService.getPersonsByDemographics(tagId, optionid);

    res.status(200).json({
        success: true,
        count: persons.length,
        data: persons,
    });
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    getPersonDetailsById,
    getDemographicsByPid,
    getDemographicFilter,
    getPersonsByDemographics,
};
