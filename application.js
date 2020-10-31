const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const winston = require('winston');

const jwtStrategy = require('./middleware/jwt-strategy');

const configuration = require('./constants/configuration');
const authController = require('./controllers/auth.controller');
const combosController = require('./controllers/combos.controller');
const projectsController = require('./controllers/projects.controller');
const tasksController = require('./controllers/tasks.controller');
const usersController = require('./controllers/users.controller');

// Configure the logger appenders and level
// FIXME: Be careful of the winston v3 changes
winston.level = process.env.LOGLEVEL || 'debug';

// MongoDB connection
mongoose.connect(configuration.database, { useNewUrlParser: true, useUnifiedTopology: true });

// ExpressJS service
const applicationPort = process.env.PORT || 3300;
const application = express();
application.disable('x-powered-by');

application.use((req, res, next) => {
    const allowedOrigins = ['https://ng-taskmanager.surge.sh'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');
    // Allow all preflight OPTIONS requests in order to avoid issues since they don't have the Authorization header
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Configure Passport to use our JWT strategy and attach it to the application
application.use(passport.initialize());
passport.use(jwtStrategy);

// Server configuration
// Serve static resources and parse requests body as JSON
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({
    extended: true
}));

// Use JWT passport for all the api/* endpoints to securize them all
application.use('/auth', authController.router);
application.all('/api/*', passport.authenticate('jwt', { session: false }));
application.use('/api/combos', combosController.router);
application.use('/api/projects', projectsController.router);
application.use('/api/tasks', tasksController.router);
application.use('/api/users', usersController.router);

// Default fallback for unbound requests
application.get('*', (request, response) => {
	response.sendStatus(404);
});

application.listen(applicationPort, () => {
  console.log(`TaskManager backend listening on port ${applicationPort}!`)
});

application.on('error', (error) => {
	console.log(` ## ERROR # ${error} ## `);
	throw error;
});
