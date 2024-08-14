// Importing PostgreSQL client...
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize; // Let's Sequelize!

// To make Render happy.
if(process.env.DATABASE_URL) {
    sequelize = new Sequelize(
        process.env.DATABASE_URL,
        {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // Note: Setting this to false can make the connection less secure
                }
            }, // To Remove SSL
        },
    );
} else {
    // XXX: Haven't set this one up yet.
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            port: process.env.DB_PORT || 5432,

        },
    );
}

module.exports = sequelize;
