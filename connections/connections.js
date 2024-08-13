const postgres = require('postgres');
require('dotenv').config();

// Importing PostgreSQL client...
const { Pool } = require('pg');

// Connecting to database...
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function setupDB() {
    const client = await pool.connect();

    try {
        const result = await client.query('SELECT NOW()'); // Checking if all in order
        console.log("Connection was successful, server time is: ", result.rows[0].now);
        return client;
    } catch (err) {
        console.error("Database connection encountered an error", err);
        exit(2);
    } 
}

module.exports = setupDB();