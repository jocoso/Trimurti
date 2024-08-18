// Importing PostgreSQL client...
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize; // Let's Sequelize!
let db_url;

// If I am in local production
if (process.env.NODE_ENV === 'production') {

    // Render url
    db_url = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

} else {

    // Local url
    db_url = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.oregon-postgres.render.com/${process.env.DB_NAME}`;

}

// Connecting to database using auth URL...
sequelize = new Sequelize(
    db_url, // url
    {
        dialect: process.env.DB_HOST,
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Note: Setting this to false can make the connection less secure
            }
        }, // To Remove SSL
    },
);



// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    }).catch(err => {
        console.log("Unable to connect to the database: ", err.message);
    });

module.exports = sequelize;
