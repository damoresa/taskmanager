const express = require('express');
const winston = require('winston');

const Project = require('./../models/project.model');

const mapToModel = (mongoProjectModel) => {
    return {
        code: mongoProjectModel.code,
        description: mongoProjectModel.name
    };
};

class CombosController {

    get router() {
        return this._router;
    }

    constructor() {
        this.init();
    }

    init() {
        this._router = express.Router();
        this._router.get('/projects', this.getProjects.bind(this));
    }

    getProjects(request, response) {

        winston.debug('Finding projects');

        Project.find((error, result) => {
            if (error) {
                const errorBody = {
                    code: 'TM-COMBO-001',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
                response.json(result.map(mapToModel));
            }
        });

    }

}

module.exports = new CombosController();
