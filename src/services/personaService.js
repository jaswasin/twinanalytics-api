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

/**
 * Retrieve a single person's details by pid.
 * @param {number|string} pid
 * @returns {Promise<Object|null>}
 */
const getPersonDetailsById = async (pid) => {
    return await personaRepository.getPersonDetailsById(pid);
};

/**
 * Retrieve demographic details by pid.
 * @param {number|string} pid
 * @returns {Promise<Object|null>}
 */
const getDemographicsByPid = async (pid) => {
    return await personaRepository.getDemographicsByPid(pid);
};

/**
 * Retrieve demographic filters.
 * @returns {Promise<Array>}
 */
const getDemographicFilter = async () => {
    return await personaRepository.getDemographicFilter();
};

/**
 * Retrieve persons by demographic filter (tagid).
 * @param {number|string} tagId
 * @param {number|string} p_option_id
 * @returns {Promise<Array>}
 */
const getPersonsByDemographics = async (tagId, p_option_id) => {
    return await personaRepository.getPersonsByDemographics(tagId, p_option_id);
};

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
