// EXT LIBS
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const path = require('path');
const controllers = require('./controllers');
const Database = require('./connections/connections');

// FILES
const database = require("./config/connections");
const controllers = require("./controllers");
const helpers = require("./utils/helpers");
require('dotenv').config();

// SESSION
const session = require("express-session");
const Store = require("connect-session-sequelize")(session.Store);
const sessionConf = require("./config/session");

// Optional Security Headers
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3001;
let server;

// Set up handlebars.js
const hbs = exphbs.create({ helpers });

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionConf);

// Security Middleware
app.use(helmet());

// Configure Express-Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use(controllers);

const main = async () => {
    try {
        database.sync({ force: false }).then(() => {
            if (process.env.NODE_ENV !== "test") {
                // Prepping for testing
                server = app.listen(PORT, () =>
                    console.log(`Now listening on port ${PORT}`)
                );
            }
        });
    } catch (err) {
        console.error(`Error Listening to port ${PORT}:`, err.message);
        process.exit(1);
    }
};

main();

// Graceful shutdown
process.on("SIGINT", () => {
    if (server) {
        server.close(() => {
            console.log("Server closed due to interruption");
            process.exit(0);
        });
    }
});

process.on("SIGTERM", () => {
    if (server) {
        server.close(() => {
            console.log("Server closed due to termination");
            process.exit(0);
        });
    }
});

// For testing purposes.
module.exports = { app, server, database };
