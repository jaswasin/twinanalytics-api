const fs = require('fs');

const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'));
const tables = Object.keys(schema);

function camelCase(str) {
    return str.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function pascalCase(str) {
    const camel = camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// ============================================
// Generate twinanalyticsRepository.js
// ============================================
let repoContent = '/**\n * Twinanalytics Repository\n * Generated API for all tables\n */\nconst { query } = require("../config/db");\n\n';

tables.forEach(table => {
    const pascal = pascalCase(table);
    const idColObj = schema[table].find(c => c.column_name === 'id');
    const idCol = idColObj ? 'id' : schema[table][0].column_name;

    repoContent += 'const getAll' + pascal + ' = async () => {\n';
    repoContent += '    const { rows } = await query("SELECT * FROM ' + table + '");\n';
    repoContent += '    return rows;\n};\n\n';

    repoContent += 'const get' + pascal + 'ById = async (' + idCol + ') => {\n';
    repoContent += '    const { rows } = await query("SELECT * FROM ' + table + ' WHERE ' + idCol + ' = $1", [' + idCol + ']);\n';
    repoContent += '    return rows[0] || null;\n};\n\n';

    const insertCols = schema[table].filter(c => c.column_default === null);
    if (insertCols.length > 0) {
        const colNames = insertCols.map(c => c.column_name).join(', ');
        const placeholders = insertCols.map((c, i) => '$' + (i + 1)).join(', ');
        const paramList = insertCols.map(c => 'data.' + c.column_name).join(', ');

        repoContent += 'const create' + pascal + ' = async (data) => {\n';
        repoContent += '    const { rows } = await query("INSERT INTO ' + table + ' (' + colNames + ') VALUES (' + placeholders + ') RETURNING *", [' + paramList + ']);\n';
        repoContent += '    return rows[0];\n};\n\n';
    }
});

repoContent += 'module.exports = {\n';
tables.forEach(table => {
    const pascal = pascalCase(table);
    repoContent += '    getAll' + pascal + ',\n    get' + pascal + 'ById,\n';
    if (schema[table].filter(c => c.column_default === null).length > 0) {
        repoContent += '    create' + pascal + ',\n';
    }
});
repoContent += '};\n';

fs.writeFileSync('src/repositories/twinanalyticsRepository.js', repoContent);

// ============================================
// Generate twinanalyticsService.js
// ============================================
let serviceContent = '/**\n * Twinanalytics Service\n * Generated API for all tables\n */\nconst repository = require("../repositories/twinanalyticsRepository");\n\n';

tables.forEach(table => {
    const pascal = pascalCase(table);
    const idColObj = schema[table].find(c => c.column_name === 'id');
    const idCol = idColObj ? 'id' : schema[table][0].column_name;

    serviceContent += 'const getAll' + pascal + ' = async () => repository.getAll' + pascal + '();\n\n';
    serviceContent += 'const get' + pascal + 'ById = async (' + idCol + ') => repository.get' + pascal + 'ById(' + idCol + ');\n\n';
    if (schema[table].filter(c => c.column_default === null).length > 0) {
        serviceContent += 'const create' + pascal + ' = async (data) => repository.create' + pascal + '(data);\n\n';
    }
});

serviceContent += 'module.exports = {\n';
tables.forEach(table => {
    const pascal = pascalCase(table);
    serviceContent += '    getAll' + pascal + ',\n    get' + pascal + 'ById,\n';
    if (schema[table].filter(c => c.column_default === null).length > 0) {
        serviceContent += '    create' + pascal + ',\n';
    }
});
serviceContent += '};\n';

fs.writeFileSync('src/services/twinanalyticsService.js', serviceContent);

// ============================================
// Generate twinanalyticsController.js
// ============================================
let controllerContent = '/**\n * Twinanalytics Controller\n * Generated API for all tables\n */\nconst asyncHandler = require("../utils/asyncHandler");\nconst AppError = require("../utils/AppError");\nconst service = require("../services/twinanalyticsService");\n\n';

tables.forEach(table => {
    const pascal = pascalCase(table);

    controllerContent += 'const getAll' + pascal + ' = asyncHandler(async (_req, res) => {\n';
    controllerContent += '    const records = await service.getAll' + pascal + '();\n';
    controllerContent += '    res.status(200).json({ success: true, count: records.length, data: records });\n});\n\n';

    controllerContent += 'const get' + pascal + 'ById = asyncHandler(async (req, res) => {\n';
    controllerContent += '    const { id } = req.params;\n';
    controllerContent += '    const record = await service.get' + pascal + 'ById(id);\n';
    controllerContent += '    if (!record) throw new AppError("' + pascal + ' not found", 404);\n';
    controllerContent += '    res.status(200).json({ success: true, data: record });\n});\n\n';

    if (schema[table].filter(c => c.column_default === null).length > 0) {
        controllerContent += 'const create' + pascal + ' = asyncHandler(async (req, res) => {\n';
        controllerContent += '    const record = await service.create' + pascal + '(req.body);\n';
        controllerContent += '    res.status(201).json({ success: true, message: "' + pascal + ' created", data: record });\n});\n\n';
    }
});

controllerContent += 'module.exports = {\n';
tables.forEach(table => {
    const pascal = pascalCase(table);
    controllerContent += '    getAll' + pascal + ',\n    get' + pascal + 'ById,\n';
    if (schema[table].filter(c => c.column_default === null).length > 0) {
        controllerContent += '    create' + pascal + ',\n';
    }
});
controllerContent += '};\n';

fs.writeFileSync('src/controllers/twinanalyticsController.js', controllerContent);

// ============================================
// Generate twinanalyticsRoutes.js
// ============================================
let routesContent = '/**\n * Twinanalytics Routes\n * Generated API for all tables\n */\nconst express = require("express");\nconst controller = require("../controllers/twinanalyticsController");\n\nconst router = express.Router();\n\n';

tables.forEach(table => {
    const pascal = pascalCase(table);
    const routeName = table.replace(/_/g, '-');

    // GET All
    routesContent += '/**\n';
    routesContent += ' * @swagger\n';
    routesContent += ' * /api/twinanalytics/' + routeName + ':\n';
    routesContent += ' *   get:\n';
    routesContent += ' *     summary: Get all ' + pascal + ' records\n';
    routesContent += ' *     tags: [TwinAnalytics]\n';
    routesContent += ' *     responses:\n';
    routesContent += ' *       200:\n';
    routesContent += ' *         description: List of ' + pascal + ' records\n';
    routesContent += ' */\n';
    routesContent += "router.get('/" + routeName + "', controller.getAll" + pascal + ");\n\n";

    // GET by ID
    routesContent += '/**\n';
    routesContent += ' * @swagger\n';
    routesContent += ' * /api/twinanalytics/' + routeName + '/{id}:\n';
    routesContent += ' *   get:\n';
    routesContent += ' *     summary: Get a ' + pascal + ' record by ID\n';
    routesContent += ' *     tags: [TwinAnalytics]\n';
    routesContent += ' *     parameters:\n';
    routesContent += ' *       - in: path\n';
    routesContent += ' *         name: id\n';
    routesContent += ' *         required: true\n';
    routesContent += ' *         schema:\n';
    routesContent += ' *           type: string\n';
    routesContent += ' *     responses:\n';
    routesContent += ' *       200:\n';
    routesContent += ' *         description: A single ' + pascal + ' record\n';
    routesContent += ' */\n';
    routesContent += "router.get('/" + routeName + "/:id', controller.get" + pascal + "ById);\n\n";

    const insertCols = schema[table].filter(c => c.column_default === null);
    if (insertCols.length > 0) {
        routesContent += '/**\n';
        routesContent += ' * @swagger\n';
        routesContent += ' * /api/twinanalytics/' + routeName + ':\n';
        routesContent += ' *   post:\n';
        routesContent += ' *     summary: Create a new ' + pascal + ' record\n';
        routesContent += ' *     tags: [TwinAnalytics]\n';
        routesContent += ' *     requestBody:\n';
        routesContent += ' *       required: true\n';
        routesContent += ' *       content:\n';
        routesContent += ' *         application/json:\n';
        routesContent += ' *           schema:\n';
        routesContent += ' *             type: object\n';
        routesContent += ' *             required: [' + insertCols.map(c => c.column_name).join(', ') + ']\n';
        routesContent += ' *             properties:\n';
        insertCols.forEach(col => {
            const typeMap = {
                'integer': 'integer',
                'boolean': 'boolean',
                'timestamp without time zone': 'string',
                'jsonb': 'object',
                'text': 'string'
            };
            const swaggType = typeMap[col.data_type] || 'string';
            routesContent += ' *               ' + col.column_name + ':\n';
            routesContent += ' *                 type: ' + swaggType + '\n';
        });
        routesContent += ' *     responses:\n';
        routesContent += ' *       201:\n';
        routesContent += ' *         description: Record successfully created\n';
        routesContent += ' */\n';
        routesContent += "router.post('/" + routeName + "', controller.create" + pascal + ");\n\n";
    }
});

routesContent += 'module.exports = router;\n';

fs.writeFileSync('src/routes/twinanalyticsRoutes.js', routesContent);

console.log("Successfully generated twinanalytics repository, service, controller, and routes.");
