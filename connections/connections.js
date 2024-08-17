const postgres = require("postgres");
require("dotenv").config();

// Importing PostgreSQL client...
const { Pool } = require("pg");

// Connecting to database...
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

async function setupDB() {
    const client = await pool.connect();
    
    try {
        const result = await pool.query("SELECT NOW()"); // Checking if all in order
        console.log(
            "Connection was successful, server time is: ",
            result.rows[0].now
        );
        return client;
    } catch (err) {
        console.error("Database connection encountered an error", err); // Leave program with a frown
    }
}

module.exports = setupDB();

