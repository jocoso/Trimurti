const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const database = require('./connections');

const sessionConf = session({

    secret: process.env.SESSION_SECRET || "A Secret",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: database,
    }),

});

module.exports = sessionConf;