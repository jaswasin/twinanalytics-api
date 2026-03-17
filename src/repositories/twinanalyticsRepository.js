/**
 * Twinanalytics Repository
 * Generated API for all tables
 */
const { query } = require("../config/db");

const getAllUsers = async () => {
    const { rows } = await query("SELECT * FROM users");
    return rows;
};

const getUsersById = async (id) => {
    const { rows } = await query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0] || null;
};

const createUsers = async (data) => {
    const { rows } = await query("INSERT INTO users (email, hashed_password, google_oauth_id, display_name, avatar_url) VALUES ($1, $2, $3, $4, $5) RETURNING *", [data.email, data.hashed_password, data.google_oauth_id, data.display_name, data.avatar_url]);
    return rows[0];
};

const getAllEmailVerificationTokens = async () => {
    const { rows } = await query("SELECT * FROM email_verification_tokens");
    return rows;
};

const getEmailVerificationTokensById = async (id) => {
    const { rows } = await query("SELECT * FROM email_verification_tokens WHERE id = $1", [id]);
    return rows[0] || null;
};

const createEmailVerificationTokens = async (data) => {
    const { rows } = await query("INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *", [data.user_id, data.token, data.expires_at]);
    return rows[0];
};

const getAllProjects = async () => {
    const { rows } = await query("SELECT * FROM projects");
    return rows;
};

const getProjectsById = async (id) => {
    const { rows } = await query("SELECT * FROM projects WHERE id = $1", [id]);
    return rows[0] || null;
};

const createProjects = async (data) => {
    const { rows } = await query("INSERT INTO projects (user_id, name, description) VALUES ($1, $2, $3) RETURNING *", [data.user_id, data.name, data.description]);
    return rows[0];
};

const getAllExperimentSessions = async () => {
    const { rows } = await query("SELECT * FROM experiment_sessions");
    return rows;
};

const getExperimentSessionsById = async (id) => {
    const { rows } = await query("SELECT * FROM experiment_sessions WHERE id = $1", [id]);
    return rows[0] || null;
};

const createExperimentSessions = async (data) => {
    const { rows } = await query("INSERT INTO experiment_sessions (project_id, user_id, name, filter_snapshot, twin_count, user_dashboard_preferences) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [data.project_id, data.user_id, data.name, data.filter_snapshot, data.twin_count, data.user_dashboard_preferences]);
    return rows[0];
};

const getAllSimulationRuns = async () => {
    const { rows } = await query("SELECT * FROM simulation_runs");
    return rows;
};

const getSimulationRunsById = async (id) => {
    const { rows } = await query("SELECT * FROM simulation_runs WHERE id = $1", [id]);
    return rows[0] || null;
};

const createSimulationRuns = async (data) => {
    const { rows } = await query("INSERT INTO simulation_runs (session_id, question, run_index, twin_ids_used, started_at, completed_at, error_message) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [data.session_id, data.question, data.run_index, data.twin_ids_used, data.started_at, data.completed_at, data.error_message]);
    return rows[0];
};

const getAllTwinResponses = async () => {
    const { rows } = await query("SELECT * FROM twin_responses");
    return rows;
};

const getTwinResponsesById = async (id) => {
    const { rows } = await query("SELECT * FROM twin_responses WHERE id = $1", [id]);
    return rows[0] || null;
};

const createTwinResponses = async (data) => {
    const { rows } = await query("INSERT INTO twin_responses (run_id, twin_id, response, response_meta) VALUES ($1, $2, $3, $4) RETURNING *", [data.run_id, data.twin_id, data.response, data.response_meta]);
    return rows[0];
};

const getAllAnalyticsArtifacts = async () => {
    const { rows } = await query("SELECT * FROM analytics_artifacts");
    return rows;
};

const getAnalyticsArtifactsById = async (id) => {
    const { rows } = await query("SELECT * FROM analytics_artifacts WHERE id = $1", [id]);
    return rows[0] || null;
};

const createAnalyticsArtifacts = async (data) => {
    const { rows } = await query("INSERT INTO analytics_artifacts (session_id, run_id, artifact_type, artifact_subtype, title, content, agent_trace, position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [data.session_id, data.run_id, data.artifact_type, data.artifact_subtype, data.title, data.content, data.agent_trace, data.position]);
    return rows[0];
};

const getAllChatMessages = async () => {
    const { rows } = await query("SELECT * FROM chat_messages");
    return rows;
};

const getChatMessagesById = async (id) => {
    const { rows } = await query("SELECT * FROM chat_messages WHERE id = $1", [id]);
    return rows[0] || null;
};

const createChatMessages = async (data) => {
    const { rows } = await query("INSERT INTO chat_messages (session_id, role, content, metadata) VALUES ($1, $2, $3, $4) RETURNING *", [data.session_id, data.role, data.content, data.metadata]);
    return rows[0];
};

const getAllHitlPending = async () => {
    const { rows } = await query("SELECT * FROM hitl_pending");
    return rows;
};

const getHitlPendingById = async (id) => {
    const { rows } = await query("SELECT * FROM hitl_pending WHERE id = $1", [id]);
    return rows[0] || null;
};

const createHitlPending = async (data) => {
    const { rows } = await query("INSERT INTO hitl_pending (session_id, hitl_type, payload, resume_token, user_response, resolved_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [data.session_id, data.hitl_type, data.payload, data.resume_token, data.user_response, data.resolved_at]);
    return rows[0];
};

const getAllRefreshTokens = async () => {
    const { rows } = await query("SELECT * FROM refresh_tokens");
    return rows;
};

const getRefreshTokensById = async (id) => {
    const { rows } = await query("SELECT * FROM refresh_tokens WHERE id = $1", [id]);
    return rows[0] || null;
};

const createRefreshTokens = async (data) => {
    const { rows } = await query("INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING *", [data.user_id, data.token_hash, data.expires_at]);
    return rows[0];
};

module.exports = {
    getAllUsers,
    getUsersById,
    createUsers,
    getAllEmailVerificationTokens,
    getEmailVerificationTokensById,
    createEmailVerificationTokens,
    getAllProjects,
    getProjectsById,
    createProjects,
    getAllExperimentSessions,
    getExperimentSessionsById,
    createExperimentSessions,
    getAllSimulationRuns,
    getSimulationRunsById,
    createSimulationRuns,
    getAllTwinResponses,
    getTwinResponsesById,
    createTwinResponses,
    getAllAnalyticsArtifacts,
    getAnalyticsArtifactsById,
    createAnalyticsArtifacts,
    getAllChatMessages,
    getChatMessagesById,
    createChatMessages,
    getAllHitlPending,
    getHitlPendingById,
    createHitlPending,
    getAllRefreshTokens,
    getRefreshTokensById,
    createRefreshTokens,
};
