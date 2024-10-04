const Sequelize = require('sequelize');
require('dotenv').config();

const db_url = process.env.DATABASE_URL;

const sequelize = new Sequelize(db_url, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Require SSL for the connection
            rejectUnauthorized: false // Allow self-signed certificates
        }
    },
    logging: false // Optional: Disable SQL logging
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err.message);
    });

module.exports = sequelize;
