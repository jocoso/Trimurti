// EXT LIBS
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();
const helmet = require("helmet"); // Optional Security Headers

// FILES
const database = require("./config/connections");
const controllers = require("./controllers");
const helpers = require("./utils/helpers");
const sessionConf = require("./config/session");

// SESSION
const session = require("express-session");
const Store = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
let server;

// Set up handlebars.js
const hbs = exphbs.create({ helpers });

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session and security middleware
app.use(sessionConf);
app.use(helmet()); // Apply helmet for security

// Configure Express-Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use(controllers);

const main = async () => {
    try {
        await database.sync({ force: false });
        if (process.env.NODE_ENV !== "test") {
            server = app.listen(PORT, () => 
                console.log(`Now listening on port ${PORT}`)
            );
        }
    } catch (err) {
        console.error(`Error Listening to port ${PORT}:`, err.message);
        process.exit(1);
    }
};

main();

// Graceful shutdown
const gracefulShutdown = (signal) => {
    if (server) {
        server.close(() => {
            console.log(`Server closed due to ${signal}`);
            process.exit(0);
        });
    }
};

process.on("SIGINT", () => gracefulShutdown("interruption"));
process.on("SIGTERM", () => gracefulShutdown("termination"));

// For testing purposes.
module.exports = { app, server, database };
