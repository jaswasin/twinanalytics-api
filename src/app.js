/**
 * Express Application Configuration
 *
 * Sets up middleware, routes, and the global error handler.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const swaggerSpec = require('./config/swagger');

const app = express();

// ─── Security ──────────────────────────────────────────
app.use(helmet()); // Set security-related HTTP headers
app.use(cors());   // Enable CORS for all origins (restrict in production)

// ─── Rate Limiting ─────────────────────────────────────
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 min
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    },
});
app.use(limiter);

// ─── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: '10kb' }));          // Parse JSON bodies (limit payload size)
app.use(express.urlencoded({ extended: true }));    // Parse URL-encoded bodies

// ─── Logging ───────────────────────────────────────────
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// ─── Swagger UI ────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'TwinAnalytics API Docs',
}));
app.get('/api-docs-json', (req, res) => res.json(swaggerSpec));

// ─── API Routes ────────────────────────────────────────
app.use('/api', routes);

// ─── 404 Catch-All ─────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found.',
    });
});

// ─── Global Error Handler (must be last) ───────────────
app.use(errorHandler);

module.exports = app;
