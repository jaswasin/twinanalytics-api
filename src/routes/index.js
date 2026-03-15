/**
 * Route Aggregator
 *
 * Imports all feature-specific route modules and mounts
 * them under their respective base paths.
 */

const express = require('express');
const analyticsRoutes = require('./analyticsRoutes');
const questionRoutes = require('./questionRoutes');
const personaRoutes = require('./personaRoutes');

const router = express.Router();

// ─── Health Check ──────────────────────────────────────
router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running.',
        timestamp: new Date().toISOString(),
    });
});

// ─── Feature Routes ────────────────────────────────────
router.use('/analytics', analyticsRoutes);
router.use('/questions', questionRoutes);
router.use('/personas', personaRoutes);

module.exports = router;
