const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const path = require('path');
const controllers = require('./controllers');
const database = require('./connections/connections');



const app = express();
const PORT = process.env.PORT || 3001;

// Set up handlebars.js
const hbs = exphbs.create({ helpers });

// Configure Express-Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));


// Middleware for parsing JSON nad urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(controllers);

const main = async () => {
    try {
        await database.sync({ force: false })
        app.listen(PORT, () => console.log(`Now listening... PORT: https://localhost:${PORT}`));
    } catch (err) {
        console.error(`Error Listening to port https://localhost:${PORT}`);
        process.exit(1);
    }
};

main();
