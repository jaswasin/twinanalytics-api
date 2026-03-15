/**
 * Persona Service
 *
 * Contains business logic for the `persona` resource.
 * Delegates database interactions to the personaRepository.
 */

const personaRepository = require('../repositories/personaRepository');

/**
 * Retrieve all personas.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
    return await personaRepository.getAll();
};

/**
 * Retrieve a single persona by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const getById = async (id) => {
    return await personaRepository.getById(id);
};

/**
 * Create a new persona.
 * @param {{ text: string }} data
 * @returns {Promise<Object>}
 */
const create = async (data) => {
    return await personaRepository.create(data);
};

/**
 * Update an existing persona.
 * @param {number|string} id
 * @param {{ text: string }} data
 * @returns {Promise<Object|null>}
 */
const update = async (id, data) => {
    return await personaRepository.update(id, data);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};
