/**
 * PostgreSQL Connection Pool
 *
 * Uses the `pg` library to create a connection pool.
 * All queries should use the exported `query` helper so
 * connections are automatically released back to the pool.
 */

const { Pool } = require('pg');

// ─── Validate required env vars ────────────────────────
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error(`❌  Missing required environment variables: ${missing.join(', ')}`);
    console.error('   Copy .env.example to .env and fill in the values.');
    process.exit(1);
}

// ─── Create pool ───────────────────────────────────────
const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20,                    // Maximum connections in the pool
    idleTimeoutMillis: 30_000,  // Close idle connections after 30 s
    connectionTimeoutMillis: 5_000, // Fail fast if DB is unreachable
});

// Log pool errors (e.g. unexpected disconnects)
pool.on('error', (err) => {
    console.error('❌  Unexpected database pool error:', err.message);
});

// Quick connectivity check on startup
pool.query('SELECT NOW()')
    .then(() => console.log('✅  Database connected successfully.'))
    .catch((err) => {
        console.error('❌  Database connection failed:', err.message);
        console.error('   Make sure PostgreSQL is running and the .env values are correct.');
    });

/**
 * Execute a parameterised query against the pool.
 *
 * @param {string} text  SQL query string with $1, $2, … placeholders
 * @param {Array}  params  Values for the placeholders
 * @returns {Promise<import('pg').QueryResult>}
 */
const query = (text, params) => pool.query(text, params);

module.exports = { pool, query };
