const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const winston = require('winston');

const configuration = require('./constants/configuration');
const combosController = require('./controllers/combos.controller');
const projectsController = require('./controllers/projects.controller');
const tasksController = require('./controllers/tasks.controller');

// Configure the logger appenders and level
// TODO: Make this environment aware & be careful of the winston v3 changes
winston.level = 'debug';

// MongoDB connection
mongoose.connect(configuration.database, {
    useMongoClient: true
});

// ExpressJS service
const applicationPort = process.env.PORT || 3300;
const application = express();

// FIXME: CORS FILTER FOR DEVELOPMENT PURPOSES ONLY
application.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Server configuration - server static resources and process JSON requests
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({
    extended: true
}));
application.use(express.static(path.join(__dirname, 'public')));

application.use('/api/combos', combosController.router);
application.use('/api/projects', projectsController.router);
application.use('/api/tasks', tasksController.router);

// Default fallback for unbound requests
application.get('*', (request, response) => {
	const indexPath = path.join(__dirname, 'public', 'index.html');
    response.sendFile(indexPath);
});

application.listen(applicationPort, () => {
  console.log(`TaskManager backend listening on port ${applicationPort}!`)
});

application.on('error', (error) => {
	console.log(` ## ERROR # ${error} ## `);
	throw error;
});
