/**
 * Twinanalytics Routes
 * Generated API for all tables
 */
const express = require("express");
const controller = require("../controllers/twinanalyticsController");

const router = express.Router();

/**
 * @swagger
 * /api/twinanalytics/users:
 *   get:
 *     summary: Get all Users records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of Users records
 */
router.get('/users', controller.getAllUsers);

/**
 * @swagger
 * /api/twinanalytics/users/{id}:
 *   get:
 *     summary: Get a Users record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single Users record
 */
router.get('/users/:id', controller.getUsersById);

/**
 * @swagger
 * /api/twinanalytics/users:
 *   post:
 *     summary: Create a new Users record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, hashed_password, google_oauth_id, display_name, avatar_url]
 *             properties:
 *               email:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               google_oauth_id:
 *                 type: string
 *               display_name:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/users', controller.createUsers);

/**
 * @swagger
 * /api/twinanalytics/email-verification-tokens:
 *   get:
 *     summary: Get all EmailVerificationTokens records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of EmailVerificationTokens records
 */
router.get('/email-verification-tokens', controller.getAllEmailVerificationTokens);

/**
 * @swagger
 * /api/twinanalytics/email-verification-tokens/{id}:
 *   get:
 *     summary: Get a EmailVerificationTokens record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single EmailVerificationTokens record
 */
router.get('/email-verification-tokens/:id', controller.getEmailVerificationTokensById);

/**
 * @swagger
 * /api/twinanalytics/email-verification-tokens:
 *   post:
 *     summary: Create a new EmailVerificationTokens record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, token, expires_at]
 *             properties:
 *               user_id:
 *                 type: integer
 *               token:
 *                 type: string
 *               expires_at:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/email-verification-tokens', controller.createEmailVerificationTokens);

/**
 * @swagger
 * /api/twinanalytics/projects:
 *   get:
 *     summary: Get all Projects records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of Projects records
 */
router.get('/projects', controller.getAllProjects);

/**
 * @swagger
 * /api/twinanalytics/projects/{id}:
 *   get:
 *     summary: Get a Projects record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single Projects record
 */
router.get('/projects/:id', controller.getProjectsById);

/**
 * @swagger
 * /api/twinanalytics/projects:
 *   post:
 *     summary: Create a new Projects record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, name, description]
 *             properties:
 *               user_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/projects', controller.createProjects);

/**
 * @swagger
 * /api/twinanalytics/experiment-sessions:
 *   get:
 *     summary: Get all ExperimentSessions records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of ExperimentSessions records
 */
router.get('/experiment-sessions', controller.getAllExperimentSessions);

/**
 * @swagger
 * /api/twinanalytics/experiment-sessions/{id}:
 *   get:
 *     summary: Get a ExperimentSessions record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ExperimentSessions record
 */
router.get('/experiment-sessions/:id', controller.getExperimentSessionsById);

/**
 * @swagger
 * /api/twinanalytics/experiment-sessions:
 *   post:
 *     summary: Create a new ExperimentSessions record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [project_id, user_id, name, filter_snapshot, twin_count, user_dashboard_preferences]
 *             properties:
 *               project_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               filter_snapshot:
 *                 type: object
 *               twin_count:
 *                 type: integer
 *               user_dashboard_preferences:
 *                 type: object
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/experiment-sessions', controller.createExperimentSessions);

/**
 * @swagger
 * /api/twinanalytics/simulation-runs:
 *   get:
 *     summary: Get all SimulationRuns records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of SimulationRuns records
 */
router.get('/simulation-runs', controller.getAllSimulationRuns);

/**
 * @swagger
 * /api/twinanalytics/simulation-runs/{id}:
 *   get:
 *     summary: Get a SimulationRuns record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single SimulationRuns record
 */
router.get('/simulation-runs/:id', controller.getSimulationRunsById);

/**
 * @swagger
 * /api/twinanalytics/simulation-runs:
 *   post:
 *     summary: Create a new SimulationRuns record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [session_id, question, run_index, twin_ids_used, started_at, completed_at, error_message]
 *             properties:
 *               session_id:
 *                 type: integer
 *               question:
 *                 type: string
 *               run_index:
 *                 type: integer
 *               twin_ids_used:
 *                 type: object
 *               started_at:
 *                 type: string
 *               completed_at:
 *                 type: string
 *               error_message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/simulation-runs', controller.createSimulationRuns);

/**
 * @swagger
 * /api/twinanalytics/twin-responses:
 *   get:
 *     summary: Get all TwinResponses records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of TwinResponses records
 */
router.get('/twin-responses', controller.getAllTwinResponses);

/**
 * @swagger
 * /api/twinanalytics/twin-responses/{id}:
 *   get:
 *     summary: Get a TwinResponses record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single TwinResponses record
 */
router.get('/twin-responses/:id', controller.getTwinResponsesById);

/**
 * @swagger
 * /api/twinanalytics/twin-responses:
 *   post:
 *     summary: Create a new TwinResponses record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [run_id, twin_id, response, response_meta]
 *             properties:
 *               run_id:
 *                 type: integer
 *               twin_id:
 *                 type: string
 *               response:
 *                 type: string
 *               response_meta:
 *                 type: object
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/twin-responses', controller.createTwinResponses);

/**
 * @swagger
 * /api/twinanalytics/analytics-artifacts:
 *   get:
 *     summary: Get all AnalyticsArtifacts records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of AnalyticsArtifacts records
 */
router.get('/analytics-artifacts', controller.getAllAnalyticsArtifacts);

/**
 * @swagger
 * /api/twinanalytics/analytics-artifacts/{id}:
 *   get:
 *     summary: Get a AnalyticsArtifacts record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single AnalyticsArtifacts record
 */
router.get('/analytics-artifacts/:id', controller.getAnalyticsArtifactsById);

/**
 * @swagger
 * /api/twinanalytics/analytics-artifacts:
 *   post:
 *     summary: Create a new AnalyticsArtifacts record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [session_id, run_id, artifact_type, artifact_subtype, title, content, agent_trace, position]
 *             properties:
 *               session_id:
 *                 type: integer
 *               run_id:
 *                 type: integer
 *               artifact_type:
 *                 type: string
 *               artifact_subtype:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: object
 *               agent_trace:
 *                 type: object
 *               position:
 *                 type: object
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/analytics-artifacts', controller.createAnalyticsArtifacts);

/**
 * @swagger
 * /api/twinanalytics/chat-messages:
 *   get:
 *     summary: Get all ChatMessages records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of ChatMessages records
 */
router.get('/chat-messages', controller.getAllChatMessages);

/**
 * @swagger
 * /api/twinanalytics/chat-messages/{id}:
 *   get:
 *     summary: Get a ChatMessages record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ChatMessages record
 */
router.get('/chat-messages/:id', controller.getChatMessagesById);

/**
 * @swagger
 * /api/twinanalytics/chat-messages:
 *   post:
 *     summary: Create a new ChatMessages record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [session_id, role, content, metadata]
 *             properties:
 *               session_id:
 *                 type: integer
 *               role:
 *                 type: string
 *               content:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/chat-messages', controller.createChatMessages);

/**
 * @swagger
 * /api/twinanalytics/hitl-pending:
 *   get:
 *     summary: Get all HitlPending records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of HitlPending records
 */
router.get('/hitl-pending', controller.getAllHitlPending);

/**
 * @swagger
 * /api/twinanalytics/hitl-pending/{id}:
 *   get:
 *     summary: Get a HitlPending record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single HitlPending record
 */
router.get('/hitl-pending/:id', controller.getHitlPendingById);

/**
 * @swagger
 * /api/twinanalytics/hitl-pending:
 *   post:
 *     summary: Create a new HitlPending record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [session_id, hitl_type, payload, resume_token, user_response, resolved_at]
 *             properties:
 *               session_id:
 *                 type: integer
 *               hitl_type:
 *                 type: string
 *               payload:
 *                 type: object
 *               resume_token:
 *                 type: string
 *               user_response:
 *                 type: object
 *               resolved_at:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/hitl-pending', controller.createHitlPending);

/**
 * @swagger
 * /api/twinanalytics/refresh-tokens:
 *   get:
 *     summary: Get all RefreshTokens records
 *     tags: [TwinAnalytics]
 *     responses:
 *       200:
 *         description: List of RefreshTokens records
 */
router.get('/refresh-tokens', controller.getAllRefreshTokens);

/**
 * @swagger
 * /api/twinanalytics/refresh-tokens/{id}:
 *   get:
 *     summary: Get a RefreshTokens record by ID
 *     tags: [TwinAnalytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single RefreshTokens record
 */
router.get('/refresh-tokens/:id', controller.getRefreshTokensById);

/**
 * @swagger
 * /api/twinanalytics/refresh-tokens:
 *   post:
 *     summary: Create a new RefreshTokens record
 *     tags: [TwinAnalytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, token_hash, expires_at]
 *             properties:
 *               user_id:
 *                 type: integer
 *               token_hash:
 *                 type: string
 *               expires_at:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record successfully created
 */
router.post('/refresh-tokens', controller.createRefreshTokens);

module.exports = router;
