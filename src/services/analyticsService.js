/**
 * Analytics Service
 *
 * Contains all database queries for the `analytics` resource.
 * Every query uses parameterised placeholders ($1, $2, …)
 * to prevent SQL injection.
 */

const db = require('../config/db');

/**
 * Retrieve all analytics records.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
    const { rows } = await db.query(
        'SELECT * FROM analytics ORDER BY created_at DESC'
    );
    return rows;
};

/**
 * Retrieve a single analytics record by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
const getById = async (id) => {
    const { rows } = await db.query(
        'SELECT * FROM analytics WHERE id = $1',
        [id]
    );
    return rows[0] || null;
};

/**
 * Create a new analytics record.
 * @param {{ name: string, value: number }} data
 * @returns {Promise<Object>}  The newly created record
 */
const create = async ({ name, value }) => {
    const { rows } = await db.query(
        `INSERT INTO analytics (name, value, created_at, updated_at)
     VALUES ($1, $2, NOW(), NOW())
     RETURNING *`,
        [name, value]
    );
    return rows[0];
};

/**
 * Update an existing analytics record.
 * @param {number|string} id
 * @param {{ name?: string, value?: number }} data
 * @returns {Promise<Object|null>}  The updated record, or null if not found
 */
const update = async (id, { name, value }) => {
    const { rows } = await db.query(
        `UPDATE analytics
     SET name       = COALESCE($1, name),
         value      = COALESCE($2, value),
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
        [name, value, id]
    );
    return rows[0] || null;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};
