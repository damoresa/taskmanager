const express = require('express');
const winston = require('winston');

const Project = require('./../models/project.model');

const mapToModel = (mongoProjectModel) => {
    return {
        code: mongoProjectModel.code,
        name: mongoProjectModel.name,
        description: mongoProjectModel.description
    };
};

class ProjectsController {

    get router() {
        return this._router;
    }

    constructor() {
        this.init();
    }

    init() {
        this._router = express.Router();
        this._router.get('/', this.getProjects.bind(this));
        this._router.post('/', this.createProject.bind(this));
    }

    getProjects(request, response) {

        winston.debug(' Finding projects ');

        Project.find((error, result) => {
            if (error) {
                const errorBody = {
                    code: 'TM-PROJECT-001',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
                response.json(result.map(mapToModel));
            }
        });

    }

    createProject(request, response) {

        const code = request.body.code;
        const name = request.body.name;
        const description = request.body.description;

        winston.debug(` Creating project ${name} `);

        const projectModel = {
            code: code,
            name: name,
            description: description
        };

        Project.create(projectModel, (error, project) => {
            if (error) {
                const errorBody = {
                    code: 'TM-PROJECT-002',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
                const successBody = {
                    code: 'TM-PROJECT-000',
                    message: 'Project successfully created'
                };

                response.json(successBody);
            }
        });

    }

}

module.exports = new ProjectsController();
