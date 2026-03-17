/**
 * Twinanalytics Controller
 * Generated API for all tables
 */
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const service = require("../services/twinanalyticsService");

const getAllUsers = asyncHandler(async (_req, res) => {
    const records = await service.getAllUsers();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getUsersById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getUsersById(id);
    if (!record) throw new AppError("Users not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createUsers = asyncHandler(async (req, res) => {
    const record = await service.createUsers(req.body);
    res.status(201).json({ success: true, message: "Users created", data: record });
});

const getAllEmailVerificationTokens = asyncHandler(async (_req, res) => {
    const records = await service.getAllEmailVerificationTokens();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getEmailVerificationTokensById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getEmailVerificationTokensById(id);
    if (!record) throw new AppError("EmailVerificationTokens not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createEmailVerificationTokens = asyncHandler(async (req, res) => {
    const record = await service.createEmailVerificationTokens(req.body);
    res.status(201).json({ success: true, message: "EmailVerificationTokens created", data: record });
});

const getAllProjects = asyncHandler(async (_req, res) => {
    const records = await service.getAllProjects();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getProjectsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getProjectsById(id);
    if (!record) throw new AppError("Projects not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createProjects = asyncHandler(async (req, res) => {
    const record = await service.createProjects(req.body);
    res.status(201).json({ success: true, message: "Projects created", data: record });
});

const getAllExperimentSessions = asyncHandler(async (_req, res) => {
    const records = await service.getAllExperimentSessions();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getExperimentSessionsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getExperimentSessionsById(id);
    if (!record) throw new AppError("ExperimentSessions not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createExperimentSessions = asyncHandler(async (req, res) => {
    const record = await service.createExperimentSessions(req.body);
    res.status(201).json({ success: true, message: "ExperimentSessions created", data: record });
});

const getAllSimulationRuns = asyncHandler(async (_req, res) => {
    const records = await service.getAllSimulationRuns();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getSimulationRunsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getSimulationRunsById(id);
    if (!record) throw new AppError("SimulationRuns not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createSimulationRuns = asyncHandler(async (req, res) => {
    const record = await service.createSimulationRuns(req.body);
    res.status(201).json({ success: true, message: "SimulationRuns created", data: record });
});

const getAllTwinResponses = asyncHandler(async (_req, res) => {
    const records = await service.getAllTwinResponses();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getTwinResponsesById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getTwinResponsesById(id);
    if (!record) throw new AppError("TwinResponses not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createTwinResponses = asyncHandler(async (req, res) => {
    const record = await service.createTwinResponses(req.body);
    res.status(201).json({ success: true, message: "TwinResponses created", data: record });
});

const getAllAnalyticsArtifacts = asyncHandler(async (_req, res) => {
    const records = await service.getAllAnalyticsArtifacts();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getAnalyticsArtifactsById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getAnalyticsArtifactsById(id);
    if (!record) throw new AppError("AnalyticsArtifacts not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createAnalyticsArtifacts = asyncHandler(async (req, res) => {
    const record = await service.createAnalyticsArtifacts(req.body);
    res.status(201).json({ success: true, message: "AnalyticsArtifacts created", data: record });
});

const getAllChatMessages = asyncHandler(async (_req, res) => {
    const records = await service.getAllChatMessages();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getChatMessagesById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getChatMessagesById(id);
    if (!record) throw new AppError("ChatMessages not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createChatMessages = asyncHandler(async (req, res) => {
    const record = await service.createChatMessages(req.body);
    res.status(201).json({ success: true, message: "ChatMessages created", data: record });
});

const getAllHitlPending = asyncHandler(async (_req, res) => {
    const records = await service.getAllHitlPending();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getHitlPendingById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getHitlPendingById(id);
    if (!record) throw new AppError("HitlPending not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createHitlPending = asyncHandler(async (req, res) => {
    const record = await service.createHitlPending(req.body);
    res.status(201).json({ success: true, message: "HitlPending created", data: record });
});

const getAllRefreshTokens = asyncHandler(async (_req, res) => {
    const records = await service.getAllRefreshTokens();
    res.status(200).json({ success: true, count: records.length, data: records });
});

const getRefreshTokensById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await service.getRefreshTokensById(id);
    if (!record) throw new AppError("RefreshTokens not found", 404);
    res.status(200).json({ success: true, data: record });
});

const createRefreshTokens = asyncHandler(async (req, res) => {
    const record = await service.createRefreshTokens(req.body);
    res.status(201).json({ success: true, message: "RefreshTokens created", data: record });
});

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
