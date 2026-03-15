/**
 * Persona Repository
 *
 * Handles all database interactions for the `persona` table.
 */

const { query } = require('../config/db');

/**
 * Retrieve all personas.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
    const { rows } = await query(
        'SELECT * FROM public.persona ORDER BY id ASC'
    );
    return rows;
};

/**
 * Retrieve a single persona by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const getById = async (id) => {
    const { rows } = await query(
        'SELECT * FROM public.persona WHERE id = $1',
        [id]
    );
    return rows[0] || null;
};

/**
 * Insert a new persona.
 * @param {{ text: string }} data
 * @returns {Promise<Object>}
 */
const create = async ({ text }) => {
    const { rows } = await query(
        `INSERT INTO public.persona (text)
         VALUES ($1)
         RETURNING *`,
        [text]
    );
    return rows[0];
};

/**
 * Update a persona by ID.
 * @param {number|string} id
 * @param {{ text: string }} data
 * @returns {Promise<Object|null>}
 */
const update = async (id, { text }) => {
    const { rows } = await query(
        `UPDATE public.persona
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
