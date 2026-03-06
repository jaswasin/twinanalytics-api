/**
 * Question Service
 *
 * Database queries for the `question` table.
 * All queries use parameterised placeholders to prevent SQL injection.
 */

const db = require('../config/db');

/**
 * Retrieve all questions.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
    const { rows } = await db.query(
        'SELECT * FROM public.question ORDER BY id ASC'
    );
    return rows;
};

/**
 * Retrieve a single question by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const getById = async (id) => {
    const { rows } = await db.query(
        'SELECT * FROM public.question WHERE id = $1',
        [id]
    );
    return rows[0] || null;
};

/**
 * Create a new question.
 * @param {{ text: string }} data
 * @returns {Promise<Object>}
 */
const create = async ({ text }) => {
    const { rows } = await db.query(
        `INSERT INTO public.question (text)
     VALUES ($1)
     RETURNING *`,
        [text]
    );
    return rows[0];
};

/**
 * Update an existing question.
 * @param {number|string} id
 * @param {{ text: string }} data
 * @returns {Promise<Object|null>}
 */
const update = async (id, { text }) => {
    const { rows } = await db.query(
        `UPDATE public.question
     SET text = $1
     WHERE id = $2
     RETURNING *`,
        [text, id]
    );
    return rows[0] || null;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};
