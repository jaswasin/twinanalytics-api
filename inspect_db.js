const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Password@01',
    database: 'oytdb-consumer',
});

async function inspect() {
    try {
        await client.connect();
        const res = await client.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
        `);
        const tables = res.rows.map(r => r.table_name);

        const schema = {};
        for (const table of tables) {
            const colRes = await client.query(`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = $1
            `, [table]);
            schema[table] = colRes.rows;
        }

        const fs = require('fs');
        fs.writeFileSync('schema.json', JSON.stringify(schema, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}
inspect();
