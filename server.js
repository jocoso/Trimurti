// EXT LIBS
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

// FILES
const database = require('./config/connections');
const controllers = require('./controllers');
const helpers = require('./utils/helpers');

// SESSION
const session = require('express-session');
const Store = require('connect-session-sequelize')(session.Store);
const sessionConf = require('./config/session');

const app = express();
const PORT = process.env.PORT || 3001;
let server;

// Set up handlebars.js
const hbs = exphbs.create({ helpers });

// Middleware for parsing JSON nad urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionConf);

// Configure Express-Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use(controllers);

const main = async () => {

    try {
        database.sync({ force: false }).then(() => {
            if (process.env.NODE_ENV !== 'test') { // Prepping for testing
                server = app.listen(PORT, () => console.log(`Now listening... PORT: https://localhost:${PORT}`));
            }
        });
    } catch (err) {
        console.error(`Error Listening to port https://localhost:${PORT}`);
        process.exit(1);
    }

};

main();

module.exports = { app, server };