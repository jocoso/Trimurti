// Importing PostgreSQL client...
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize; // Let's Sequelize!

// For Render
if (process.env.DATABASE_URL) {

    // Connecting to database using auth URL...
    sequelize = new Sequelize(
        process.env.DATABASE_URL, // url
        {
            dialect: process.env.DB_HOST,
            protocol: 'postgres',
            port: process.env.DB_PORT || 5432,
            dialectOptions: isTest ? {} : {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // Note: Setting this to false can make the connection less secure
                }
            }, // To Remove SSL
        },
    );

} else { // In the case I can't use the online server

    // Connecting to database using auth info...
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

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    }).catch(err => {
        console.log("Unable to connect to the database: ", err.message);
    });

module.exports = sequelize;
