const express = require('express');
const winston = require('winston');

const User = require('./../models/user.model');

const mapToModel = (mongoUserModel) => {
    return {
        username: mongoUserModel.username,
        email: mongoUserModel.email
    };
};

class UsersController {

    get router() {
        return this._router;
    }

    constructor() {
        this.init();
    }

    init() {
        this._router = express.Router();
        this._router.get('/', this.getUsers.bind(this));
        this._router.get('/create', this.createUser.bind(this));
    }

    getUsers(request, response) {

        winston.debug('Finding users');

        User.find((error, result) => {
            if (error) {
                const errorBody = {
                    code: 'TM-USERS-001',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
                response.json(result.map(mapToModel));
            }
        });

    }

    createUser(request, response) {

        const username = request.body.username;
        const password = request.body.password;
        const email = request.body.email;

        winston.debug(`Creating user ${username}`);

        const userModel = {
            username: username,
            password: password,
            email: email
        };

        User.create(userModel, (error, user) => {
            if (error) {
                const errorBody = {
                    code: 'TM-USERS-002',
                    message: error
                };

                winston.error(JSON.stringify(errorBody));
                response.json(errorBody);
            } else {
                const successBody = {
                    code: 'TM-USERS-000',
                    message: 'User successfully created'
                };

                response.json(successBody);
            }
        });

    }

}

module.exports = new UsersController();
