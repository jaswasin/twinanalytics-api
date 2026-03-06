/**
 * Question Service
 *
 * Contains business logic for the `question` resource.
 * Delegates database interactions to the questionRepository.
 */

const questionRepository = require('../repositories/questionRepository');

/**
 * Retrieve all questions.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
    // Add any necessary business logic here
    return await questionRepository.getAll();
};

/**
 * Retrieve a single question by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const getById = async (id) => {
    // Add any necessary business logic here
    return await questionRepository.getById(id);
};

/**
 * Create a new question.
 * @param {{ text: string }} data
 * @returns {Promise<Object>}
 */
const create = async (data) => {
    // Add validation or transformation logic here
    return await questionRepository.create(data);
};

/**
 * Update an existing question.
 * @param {number|string} id
 * @param {{ text: string }} data
 * @returns {Promise<Object|null>}
 */
const update = async (id, data) => {
    // Add validation or transformation logic here
    return await questionRepository.update(id, data);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};
