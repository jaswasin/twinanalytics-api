/**
 * Twinanalytics Service
 * Generated API for all tables
 */
const repository = require("../repositories/twinanalyticsRepository");

const getAllUsers = async () => repository.getAllUsers();

const getUsersById = async (id) => repository.getUsersById(id);

const createUsers = async (data) => repository.createUsers(data);

const getAllEmailVerificationTokens = async () => repository.getAllEmailVerificationTokens();

const getEmailVerificationTokensById = async (id) => repository.getEmailVerificationTokensById(id);

const createEmailVerificationTokens = async (data) => repository.createEmailVerificationTokens(data);

const getAllProjects = async () => repository.getAllProjects();

const getProjectsById = async (id) => repository.getProjectsById(id);

const createProjects = async (data) => repository.createProjects(data);

const getAllExperimentSessions = async () => repository.getAllExperimentSessions();

const getExperimentSessionsById = async (id) => repository.getExperimentSessionsById(id);

const createExperimentSessions = async (data) => repository.createExperimentSessions(data);

const getAllSimulationRuns = async () => repository.getAllSimulationRuns();

const getSimulationRunsById = async (id) => repository.getSimulationRunsById(id);

const createSimulationRuns = async (data) => repository.createSimulationRuns(data);

const getAllTwinResponses = async () => repository.getAllTwinResponses();

const getTwinResponsesById = async (id) => repository.getTwinResponsesById(id);

const createTwinResponses = async (data) => repository.createTwinResponses(data);

const getAllAnalyticsArtifacts = async () => repository.getAllAnalyticsArtifacts();

const getAnalyticsArtifactsById = async (id) => repository.getAnalyticsArtifactsById(id);

const createAnalyticsArtifacts = async (data) => repository.createAnalyticsArtifacts(data);

const getAllChatMessages = async () => repository.getAllChatMessages();

const getChatMessagesById = async (id) => repository.getChatMessagesById(id);

const createChatMessages = async (data) => repository.createChatMessages(data);

const getAllHitlPending = async () => repository.getAllHitlPending();

const getHitlPendingById = async (id) => repository.getHitlPendingById(id);

const createHitlPending = async (data) => repository.createHitlPending(data);

const getAllRefreshTokens = async () => repository.getAllRefreshTokens();

const getRefreshTokensById = async (id) => repository.getRefreshTokensById(id);

const createRefreshTokens = async (data) => repository.createRefreshTokens(data);

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
