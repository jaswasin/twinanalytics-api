/**
 * Analytics Service
 *
 * Contains business logic for the `analytics` resource.
 * Delegates database interactions to the analyticsRepository.
 */

const analyticsRepository = require('../repositories/analyticsRepository');

/**
 * Retrieve all analytics records.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
    return await analyticsRepository.getAll();
};

/**
 * Retrieve a single analytics record by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const getById = async (id) => {
    return await analyticsRepository.getById(id);
};

/**
 * Create a new analytics record.
 * @param {{ name: string, value: number }} data
 * @returns {Promise<Object>}  The newly created record
 */
const create = async (data) => {
    // Analytics-specific business logic could go here
    return await analyticsRepository.create(data);
};

/**
 * Update an existing analytics record.
 * @param {number|string} id
 * @param {{ name?: string, value?: number }} data
 * @returns {Promise<Object|null>}  The updated record, or null if not found
 */
const update = async (id, data) => {
    return await analyticsRepository.update(id, data);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};
