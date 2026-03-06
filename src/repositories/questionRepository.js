/**
 * Question Repository
 *
 * Handles all database interactions for the `question` table.
 */

const { query } = require('../config/db');

/**
 * Retrieve all questions with category and type data.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
    const { rows } = await query(
        'SELECT q.id question_id, q.text question_text, c.id category_id, c.name category, qt.id type_id, qt.qtype type FROM public.question q JOIN public.mstcategories c ON q.category_id = c.id JOIN public.mstquestion_type qt ON q.type_id = qt.id'
    );
    return rows;
};

/**
 * Retrieve a single question by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const getById = async (id) => {
    const { rows } = await query(
        'SELECT * FROM public.question WHERE id = $1',
        [id]
    );
    return rows[0] || null;
};

/**
 * Insert a new question.
 * @param {{ text: string }} data
 * @returns {Promise<Object>}
 */
const create = async ({ text }) => {
    const { rows } = await query(
        `INSERT INTO public.question (text)
         VALUES ($1)
         RETURNING *`,
        [text]
    );
    return rows[0];
};

/**
 * Update a question by ID.
 * @param {number|string} id
 * @param {{ text: string }} data
 * @returns {Promise<Object|null>}
 */
const update = async (id, { text }) => {
    const { rows } = await query(
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
