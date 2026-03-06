/**
 * TwinAnalytics API — Entry Point
 *
 * Loads environment variables, starts the Express server,
 * and handles graceful shutdown.
 */

require('dotenv').config();

const app = require('./src/app');
const { pool } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// ─── Start Server ──────────────────────────────────────
const server = app.listen(PORT, () => {
    console.log(`✅  Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

// ─── Graceful Shutdown ─────────────────────────────────
const shutdown = async (signal) => {
    console.log(`\n🛑  ${signal} received — shutting down gracefully…`);

    server.close(async () => {
        try {
            await pool.end();
            console.log('📦  Database pool closed.');
        } catch (err) {
            console.error('❌  Error closing database pool:', err.message);
        }
        process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('⚠️   Forced shutdown after timeout.');
        process.exit(1);
    }, 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Catch unhandled errors so the process never silently dies
process.on('unhandledRejection', (reason) => {
    console.error('❌  Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('❌  Uncaught Exception:', err);
    process.exit(1);
});
