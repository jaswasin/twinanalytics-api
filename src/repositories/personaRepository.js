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
        'SELECT get_digitaltwin_profile($1) as profile',
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

/**
 * Retrieve a single person by pid.
 * @param {number|string} pid
 * @returns {Promise<Object|null>}
 */
const getPersonDetailsById = async (pid) => {
    const { rows } = await query(
        'SELECT * FROM public.person WHERE pid = $1',
        [pid]
    );
    return rows[0] || null;
};

/**
 * Retrieve demographic details by pid.
 * @param {number|string} pid
 * @returns {Promise<Object|null>}
 */
const getDemographicsByPid = async (pid) => {
    const { rows } = await query(
        'SELECT * FROM public.get_demographic_details($1)',
        [pid]
    );
    return rows[0] || null;
};

/**
 * Retrieve demographic filters.
 * @returns {Promise<Array>}
 */
const getDemographicFilter = async () => {
    const { rows } = await query(
        `SELECT tagid, tag, q.id as question_id, text,o.option_id,option_order,option_text 
         FROM public.question_tag qt
         JOIN public.question q ON qt.question_id = q.id
		 join lnk_question_option lqo on lqo.question_id=q.id
		 join option o on o.option_id=lqo.option_id
         WHERE q.category_id = 1`
    );
    return rows;
};

/**
 * Retrieve persons by demographic filter (tagid).
 * @param {number|string} tagId
 * @param {number|string} p_option_id
 * @returns {Promise<Array>}
 */
const getPersonsByDemographics = async (tagId, p_option_id) => {
    const { rows } = await query(
        'SELECT * FROM public.get_persons_by_demographics($1,$2)',
        [tagId, p_option_id]
    );
    return rows;
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
