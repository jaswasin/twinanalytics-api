/**
 * Swagger / OpenAPI Configuration
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TwinAnalytics API',
            version: '1.0.0',
            description: 'REST API for TwinAnalytics — fetches data from PostgreSQL and exposes GET, POST, and PUT endpoints.',
            contact: {
                name: 'TwinAnalytics Team',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Question: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 256 },
                        text: { type: 'string', example: 'Which part of the United States do you currently live in?' },
                        category_id: { type: 'integer', example: 1 },
                        isactive: { type: 'boolean', example: true },
                        type_id: { type: 'integer', example: 1 },
                        qid: { type: 'string', example: 'QID11' },
                    },
                },
                Analytics: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'page_views' },
                        value: { type: 'number', example: 1024 },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'Validation failed.' },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field: { type: 'string' },
                                    message: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
